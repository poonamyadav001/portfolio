// Task Manager Application - Complete Feature Set
class TaskManager {
    constructor() {
        this.tasks = [];
        this.dailyGoal = 0;
        this.currentFilter = 'all';
        this.currentCategory = 'all';
        this.currentPriority = 'all';
        this.searchQuery = '';
        this.darkMode = localStorage.getItem('darkMode') === 'true';
        this.draggedTask = null;
        this.currentModalTaskId = null;
        this.modalSubtasks = [];

        this.initializeApp();
    }

    initializeApp() {
        this.loadTasks();
        this.setupEventListeners();
        this.applyDarkMode();
        this.render();
    }

    // ============ LOCAL STORAGE ============
    loadTasks() {
        const stored = localStorage.getItem('tasks');
        this.tasks = stored ? JSON.parse(stored) : [];
        this.dailyGoal = parseInt(localStorage.getItem('dailyGoal')) || 0;
    }

    saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(this.tasks));
        localStorage.setItem('dailyGoal', this.dailyGoal);
    }

    // ============ TASK OPERATIONS ============
    addTask(name, category, priority, deadline, recurring) {
        if (!name.trim()) {
            this.showNotification('Please enter a task', 'error');
            return;
        }

        const task = {
            id: Date.now(),
            name,
            category,
            priority,
            deadline,
            recurring,
            completed: false,
            pinned: false,
            createdAt: new Date().toISOString(),
            completedAt: null,
            subtasks: [],
            reminder: 'none',
            notes: ''
        };

        this.tasks.unshift(task);
        this.saveTasks();
        this.render();
        this.showNotification('Task added successfully ✨');
    }

    updateTask(id, updates) {
        const task = this.tasks.find(t => t.id === id);
        if (task) {
            Object.assign(task, updates);
            if (updates.completed && !task.completedAt) {
                task.completedAt = new Date().toISOString();
            }
            this.saveTasks();
            this.render();
        }
    }

    deleteTask(id) {
        this.tasks = this.tasks.filter(t => t.id !== id);
        this.saveTasks();
        this.render();
        this.showNotification('Task deleted');
    }

    toggleTaskComplete(id) {
        const task = this.tasks.find(t => t.id === id);
        if (task) {
            task.completed = !task.completed;
            if (task.completed) {
                task.completedAt = new Date().toISOString();
            }
            this.saveTasks();
            this.render();
        }
    }

    togglePinned(id) {
        const task = this.tasks.find(t => t.id === id);
        if (task) {
            task.pinned = !task.pinned;
            if (task.pinned) {
                this.tasks.splice(this.tasks.indexOf(task), 1);
                this.tasks.unshift(task);
            }
            this.saveTasks();
            this.render();
        }
    }

    addSubtask(taskId, subtaskText) {
        const task = this.tasks.find(t => t.id === taskId);
        if (task) {
            const subtask = {
                id: Date.now(),
                text: subtaskText,
                completed: false
            };
            task.subtasks.push(subtask);
            this.saveTasks();
            this.render();
        }
    }

    toggleSubtask(taskId, subtaskId) {
        const task = this.tasks.find(t => t.id === taskId);
        if (task) {
            const subtask = task.subtasks.find(s => s.id === subtaskId);
            if (subtask) {
                subtask.completed = !subtask.completed;
                this.saveTasks();
                this.render();
            }
        }
    }

    deleteSubtask(taskId, subtaskId) {
        const task = this.tasks.find(t => t.id === taskId);
        if (task) {
            task.subtasks = task.subtasks.filter(s => s.id !== subtaskId);
            this.saveTasks();
            this.render();
        }
    }

    // ============ FILTERING & SEARCHING ============
    getFilteredTasks() {
        let filtered = this.tasks;

        // Filter by status
        if (this.currentFilter === 'active') {
            filtered = filtered.filter(t => !t.completed);
        } else if (this.currentFilter === 'completed') {
            filtered = filtered.filter(t => t.completed);
        } else if (this.currentFilter === 'pinned') {
            filtered = filtered.filter(t => t.pinned);
        }

        // Filter by category
        if (this.currentCategory !== 'all') {
            filtered = filtered.filter(t => t.category === this.currentCategory);
        }

        // Filter by priority
        if (this.currentPriority !== 'all') {
            filtered = filtered.filter(t => t.priority === this.currentPriority);
        }

        // Search
        if (this.searchQuery) {
            const query = this.searchQuery.toLowerCase();
            filtered = filtered.filter(t => 
                t.name.toLowerCase().includes(query) || 
                (t.notes || '').toLowerCase().includes(query)
            );
        }

        // Sort: pinned first, then by priority
        filtered.sort((a, b) => {
            if (a.pinned !== b.pinned) return b.pinned - a.pinned;
            const priorityOrder = { 'High': 0, 'Medium': 1, 'Low': 2 };
            return priorityOrder[a.priority] - priorityOrder[b.priority];
        });

        return filtered;
    }

    // ============ STATISTICS ============
    getStatistics() {
        const total = this.tasks.length;
        const completed = this.tasks.filter(t => t.completed).length;
        const rate = total === 0 ? 0 : Math.round((completed / total) * 100);

        const byCategory = {};
        const byPriority = {};

        this.tasks.forEach(t => {
            byCategory[t.category] = (byCategory[t.category] || 0) + 1;
            byPriority[t.priority] = (byPriority[t.priority] || 0) + 1;
        });

        return {
            total,
            completed,
            remaining: total - completed,
            rate,
            byCategory,
            byPriority
        };
    }

    getProgressPercentage() {
        if (this.tasks.length === 0) return 0;
        const completed = this.tasks.filter(t => t.completed).length;
        return Math.round((completed / this.tasks.length) * 100);
    }

    // ============ DARK MODE ============
    toggleDarkMode() {
        this.darkMode = !this.darkMode;
        localStorage.setItem('darkMode', this.darkMode);
        this.applyDarkMode();
    }

    applyDarkMode() {
        if (this.darkMode) {
            document.documentElement.style.colorScheme = 'dark';
            document.body.classList.add('dark-mode');
        } else {
            document.documentElement.style.colorScheme = 'light';
            document.body.classList.remove('dark-mode');
        }
    }

    // ============ NOTIFICATIONS ============
    showNotification(message, type = 'success') {
        const notif = document.getElementById('notification');
        notif.textContent = message;
        notif.className = `notification show`;
        
        if (type === 'error') {
            notif.style.background = 'var(--danger-color)';
        } else {
            notif.style.background = 'var(--success-color)';
        }

        setTimeout(() => {
            notif.classList.remove('show');
        }, 3000);
    }

    // ============ DATE UTILITIES ============
    getDeadlineStatus(deadline) {
        if (!deadline) return null;
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const deadlineDate = new Date(deadline);
        deadlineDate.setHours(0, 0, 0, 0);
        const diffTime = deadlineDate - today;
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays < 0) return 'overdue';
        if (diffDays === 0) return 'today';
        if (diffDays <= 3) return 'upcoming';
        return 'safe';
    }

    formatDeadline(deadline) {
        if (!deadline) return '';
        const date = new Date(deadline);
        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);

        today.setHours(0, 0, 0, 0);
        tomorrow.setHours(0, 0, 0, 0);
        date.setHours(0, 0, 0, 0);

        if (date.getTime() === today.getTime()) return '📅 Today';
        if (date.getTime() === tomorrow.getTime()) return '📅 Tomorrow';
        return '📅 ' + date.toLocaleDateString();
    }

    // ============ RENDERING ============
    render() {
        this.renderTasks();
        this.updateProgress();
        this.updateEmptyState();
    }

    renderTasks() {
        const taskList = document.getElementById('taskList');
        const filtered = this.getFilteredTasks();

        taskList.innerHTML = filtered.map(task => this.createTaskElement(task)).join('');
        
        // Add event listeners to rendered tasks
        taskList.querySelectorAll('.task-checkbox').forEach(checkbox => {
            checkbox.addEventListener('change', (e) => {
                this.toggleTaskComplete(parseInt(e.target.dataset.taskId));
            });
        });

        taskList.querySelectorAll('.task-pin').forEach(pin => {
            pin.addEventListener('click', (e) => {
                this.togglePinned(parseInt(e.target.dataset.taskId));
            });
        });

        taskList.querySelectorAll('.task-edit').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.openTaskModal(parseInt(e.target.dataset.taskId));
            });
        });

        taskList.querySelectorAll('.task-delete').forEach(btn => {
            btn.addEventListener('click', (e) => {
                if (confirm('Delete this task?')) {
                    this.deleteTask(parseInt(e.target.dataset.taskId));
                }
            });
        });

        taskList.querySelectorAll('.subtask-checkbox').forEach(checkbox => {
            checkbox.addEventListener('change', (e) => {
                this.toggleSubtask(
                    parseInt(e.target.dataset.taskId),
                    parseInt(e.target.dataset.subtaskId)
                );
            });
        });

        // Drag and drop
        taskList.querySelectorAll('.task-item').forEach(item => {
            item.draggable = true;
            item.addEventListener('dragstart', (e) => this.draggedTask = parseInt(e.currentTarget.dataset.taskId));
            item.addEventListener('dragover', (e) => e.preventDefault());
            item.addEventListener('drop', (e) => {
                e.preventDefault();
                const targetId = parseInt(e.currentTarget.dataset.taskId);
                if (this.draggedTask !== targetId) {
                    const draggedIndex = this.tasks.findIndex(t => t.id === this.draggedTask);
                    const targetIndex = this.tasks.findIndex(t => t.id === targetId);
                    [this.tasks[draggedIndex], this.tasks[targetIndex]] = 
                    [this.tasks[targetIndex], this.tasks[draggedIndex]];
                    this.saveTasks();
                    this.render();
                }
            });
        });
    }

    createTaskElement(task) {
        const deadline = this.formatDeadline(task.deadline);
        const deadlineStatus = this.getDeadlineStatus(task.deadline);
        const subtaskHTML = task.subtasks.length > 0 ? `
            <div class="subtasks">
                ${task.subtasks.map(st => `
                    <div class="subtask-item">
                        <input type="checkbox" ${st.completed ? 'checked' : ''} 
                            data-subtask-id="${st.id}" class="subtask-checkbox"
                            data-task-id="${task.id}">
                        <span>${st.text}</span>
                    </div>
                `).join('')}
            </div>
        ` : '';

        return `
            <li class="task-item ${task.completed ? 'completed' : ''} ${task.pinned ? 'pinned' : ''}" 
                data-task-id="${task.id}">
                <div class="task-content">
                    <div class="task-header">
                        <input type="checkbox" class="task-checkbox" ${task.completed ? 'checked' : ''} 
                            data-task-id="${task.id}">
                        <span class="task-pin ${task.pinned ? 'pinned' : ''}" data-task-id="${task.id}">
                            ${task.pinned ? '📌' : '☐'}
                        </span>
                        <span class="task-text">${task.name}</span>
                        <span class="priority-badge ${task.priority.toLowerCase()}">
                            ${task.priority}
                        </span>
                    </div>
                    <div class="task-meta">
                        <span class="category-badge ${task.category}">${task.category}</span>
                        ${deadline ? `<span class="meta-item deadline-item ${deadlineStatus || ''}">${deadline}</span>` : ''}
                        ${task.recurring !== 'none' ? `<span class="meta-item">🔄 ${task.recurring}</span>` : ''}
                    </div>
                    ${subtaskHTML}
                </div>
                <div class="task-actions">
                    <button class="task-action-btn task-edit" data-task-id="${task.id}" title="Edit">✏️</button>
                    <button class="task-action-btn task-delete" data-task-id="${task.id}" title="Delete">🗑️</button>
                </div>
            </li>
        `;
    }

    updateProgress() {
        const percentage = this.getProgressPercentage();
        document.getElementById('progressFill').style.width = percentage + '%';
        document.getElementById('progressPercentage').textContent = percentage + '%';
    }

    updateEmptyState() {
        const filtered = this.getFilteredTasks();
        const emptyState = document.getElementById('emptyState');
        emptyState.style.display = filtered.length === 0 ? 'block' : 'none';
    }

    // ============ MODALS ============
    openTaskModal(taskId = null) {
        this.currentModalTaskId = taskId;
        const modal = document.getElementById('taskModal');
        const task = taskId ? this.tasks.find(t => t.id === taskId) : null;

        const modalName = document.getElementById('modalTaskName');
        const modalDesc = document.getElementById('modalTaskDesc');
        const modalCategory = document.getElementById('modalCategory');
        const modalPriority = document.getElementById('modalPriority');
        const modalDeadline = document.getElementById('modalDeadline');
        const modalReminder = document.getElementById('modalReminder');
        const subtasksList = document.getElementById('subtasksList');

        if (task) {
            this.modalSubtasks = [...task.subtasks];
            modalName.value = task.name;
            modalDesc.value = task.notes;
            modalCategory.value = task.category;
            modalPriority.value = task.priority;
            modalDeadline.value = task.deadline || '';
            modalReminder.value = task.reminder;
        } else {
            this.modalSubtasks = [];
            modalName.value = '';
            modalDesc.value = '';
            modalCategory.value = 'Personal';
            modalPriority.value = 'Medium';
            modalDeadline.value = '';
            modalReminder.value = 'none';
        }

        subtasksList.innerHTML = this.modalSubtasks.map(st => `
                <div class="subtask-item" style="margin-bottom: 8px; display:flex; align-items:center; gap: 8px;">
                    <input type="checkbox" ${st.completed ? 'checked' : ''} 
                        class="subtask-toggle" data-subtask-id="${st.id}">
                    <span>${st.text}</span>
                    <button type="button" class="task-action-btn subtask-remove" data-subtask-id="${st.id}" style="margin-left:auto;">🗑️</button>
                </div>
            `).join('');

        subtasksList.querySelectorAll('.subtask-toggle').forEach(toggle => {
            toggle.addEventListener('change', (e) => {
                const subtaskId = parseInt(e.target.dataset.subtaskId);
                const subtask = this.modalSubtasks.find(st => st.id === subtaskId);
                if (subtask) {
                    subtask.completed = !subtask.completed;
                }
            });
        });

        subtasksList.querySelectorAll('.subtask-remove').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const removeId = parseInt(e.target.dataset.subtaskId);
                this.modalSubtasks = this.modalSubtasks.filter(st => st.id !== removeId);
                this.openTaskModal(this.currentModalTaskId);
            });
        });

        document.getElementById('saveTaskBtn').onclick = () => {
            const taskData = {
                name: modalName.value,
                notes: modalDesc.value,
                category: modalCategory.value,
                priority: modalPriority.value,
                deadline: modalDeadline.value,
                reminder: modalReminder.value,
                subtasks: [...this.modalSubtasks]
            };

            if (this.currentModalTaskId) {
                this.updateTask(this.currentModalTaskId, taskData);
                this.showNotification('Task updated ✨');
            } else {
                this.addTask(taskData.name, taskData.category, taskData.priority, taskData.deadline, 'none');
                const createdTask = this.tasks[0];
                if (createdTask) {
                    createdTask.notes = taskData.notes;
                    createdTask.reminder = taskData.reminder;
                    createdTask.subtasks = taskData.subtasks;
                    this.saveTasks();
                }
            }

            this.closeModal('taskModal');
        };

        modal.classList.add('active');
    }

    closeModal(modalId) {
        document.getElementById(modalId).classList.remove('active');
    }

    openStatsModal() {
        const stats = this.getStatistics();
        const modal = document.getElementById('statsModal');

        document.getElementById('statTotal').textContent = stats.total;
        document.getElementById('statCompleted').textContent = stats.completed;
        document.getElementById('statRemaining').textContent = stats.remaining;
        document.getElementById('statRate').textContent = stats.rate + '%';

        const categoryHTML = Object.entries(stats.byCategory)
            .map(([cat, count]) => `<div>${cat}: ${count}</div>`)
            .join('');
        document.getElementById('categoryStats').innerHTML = categoryHTML;

        const priorityHTML = Object.entries(stats.byPriority)
            .map(([pri, count]) => `<div>${pri}: ${count}</div>`)
            .join('');
        document.getElementById('priorityStats').innerHTML = priorityHTML;

        const completedToday = this.tasks.filter(t => {
            if (!t.completedAt) return false;
            const completed = new Date(t.completedAt);
            const today = new Date();
            return completed.toDateString() === today.toDateString();
        }).length;

        const goal = this.dailyGoal > 0 ? `Goal: ${this.dailyGoal} | Completed Today: ${completedToday}` : 'Set a daily goal';
        document.getElementById('goalStatus').textContent = goal;

        document.getElementById('setGoalBtn').onclick = () => {
            const value = parseInt(document.getElementById('goalInput').value);
            if (value > 0) {
                this.dailyGoal = value;
                this.saveTasks();
                this.openStatsModal();
                this.showNotification('Daily goal set! 🎯');
            }
        };

        modal.classList.add('active');
    }

    // ============ EVENT LISTENERS ============
    setupEventListeners() {
        // Add task
        document.getElementById('addBtn').addEventListener('click', () => {
            const name = document.getElementById('taskInput').value;
            const category = document.getElementById('categorySelect').value;
            const priority = document.getElementById('prioritySelect').value;
            const deadline = document.getElementById('deadlineInput').value;
            const recurring = document.getElementById('recurringSelect').value;

            this.addTask(name, category, priority, deadline, recurring);
            document.getElementById('taskInput').value = '';
            document.getElementById('deadlineInput').value = '';
        });

        // Theme toggle
        document.getElementById('themeToggle').addEventListener('click', () => {
            this.toggleDarkMode();
            document.getElementById('themeToggle').textContent = this.darkMode ? '☀️' : '🌙';
        });

        // Stats button
        document.getElementById('statsBtn').addEventListener('click', () => {
            this.openStatsModal();
        });

        // Filter buttons
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');
                this.currentFilter = e.target.dataset.filter;
                this.render();
            });
        });

        // Category buttons
        document.querySelectorAll('.category-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                document.querySelectorAll('.category-btn').forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');
                this.currentCategory = e.target.dataset.category;
                this.render();
            });
        });

        // Priority buttons
        document.querySelectorAll('.priority-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                document.querySelectorAll('.priority-btn').forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');
                this.currentPriority = e.target.dataset.priority;
                this.render();
            });
        });

        // Search
        document.getElementById('searchInput').addEventListener('input', (e) => {
            this.searchQuery = e.target.value;
            this.render();
        });

        // Modal controls
        document.getElementById('addTaskBtn').addEventListener('click', () => {
            this.openTaskModal();
        });

        document.querySelector('.close-btn').addEventListener('click', () => {
            this.closeModal('taskModal');
        });

        document.getElementById('closeModalBtn').addEventListener('click', () => {
            this.closeModal('taskModal');
        });

        document.getElementById('closeStatsBtn').addEventListener('click', () => {
            this.closeModal('statsModal');
        });

        document.querySelector('#statsModal .close-btn').addEventListener('click', () => {
            this.closeModal('statsModal');
        });

        // Add subtask
        document.getElementById('addSubtaskBtn').addEventListener('click', () => {
            const input = document.getElementById('newSubtask');
            const text = input.value.trim();
            if (text) {
                this.modalSubtasks.push({
                    id: Date.now(),
                    text,
                    completed: false
                });
                input.value = '';
                this.openTaskModal(this.currentModalTaskId);
            }
        });

        // Close modal on outside click
        document.getElementById('taskModal').addEventListener('click', (e) => {
            if (e.target.id === 'taskModal') {
                this.closeModal('taskModal');
            }
        });

        document.getElementById('statsModal').addEventListener('click', (e) => {
            if (e.target.id === 'statsModal') {
                this.closeModal('statsModal');
            }
        });

        // Goal button
        document.getElementById('goalBtn').addEventListener('click', () => {
            this.openStatsModal();
        });
    }
}

// Initialize the app
let taskManager;
if (typeof document !== 'undefined' && typeof window !== 'undefined') {
    document.addEventListener('DOMContentLoaded', () => {
        taskManager = new TaskManager();
    });
} else {
    console.warn('TaskManager script loaded outside a browser environment. Initialization is skipped.');
}

