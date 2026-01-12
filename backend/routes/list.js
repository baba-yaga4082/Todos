

const router = require('express').Router();
const { List } = require('../models/list');
const { User } = require('../models/user');
const auth = require('../middleware/auth');

router.post('/addtask', auth, async (req, res) => {
    try {
        const { title, body } = req.body;
        const userId = req.user.userId;

        if (!title || !body) {
            return res.status(400).json({ error: 'Title and body are required' });
        }

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const newtask = new List({ title, body, User: user._id });
        await newtask.save();

        user.list.push(newtask._id);
        await user.save();

        return res.status(200).json({
            message: 'Task added successfully',
            task: newtask
        });
    } catch (error) {
        console.error("Add task error:", error);
        return res.status(500).json({ error: 'Internal server error' });
    }
});

router.put('/updatetask/:id', auth, async (req, res) => {
    try {
        const { title, body } = req.body;

        if (!title || !body) {
            return res.status(400).json({ error: 'Title and body are required' });
        }

        const task = await List.findByIdAndUpdate(
            req.params.id,
            { title, body },
            { new: true, runValidators: true }
        );

        if (!task) {
            return res.status(404).json({ error: 'Task not found' });
        }

        return res.status(200).json({
            message: 'Task updated successfully',
            task
        });
    } catch (error) {
        console.error("Update task error:", error);
        return res.status(500).json({ error: 'Internal server error' });
    }
});


router.delete('/deletetask/:id', auth, async (req, res) => {
    try {
        const task = await List.findByIdAndDelete(req.params.id);

        if (!task) {
            return res.status(404).json({ error: 'Task not found' });
        }

        await User.findByIdAndUpdate(task.User, {
            $pull: { list: req.params.id }
        });

        return res.status(200).json({
            message: 'Task deleted successfully',
            task
        });
    } catch (error) {
        console.error("Delete task error:", error);
        return res.status(500).json({ error: 'Internal server error' });
    }
});


router.get('/gettasks', auth, async (req, res) => {
    try {
        const userId = req.user.userId;
        const tasks = await List.find({ User: userId }).sort({ createdAt: -1 });
        return res.status(200).json({ list: tasks });
    } catch (error) {
        console.error("Get tasks error:", error);
        return res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;