const TasksApp = {
	data() {
		return {
			tasks: [],
			task: '',
		}
	},
	mounted() {
		this.loadTasks()
	},
	computed: {
		todo() {
			return this.tasks.filter(task => !task.done)
		},
		done() {
			return this.tasks.filter(task => task.done)
		},
	},
	watch: {
		tasks: {
			handler() {
				this.saveTasks()
			},
			deep: true,
		},
	},
	methods: {
		createTask() {
			this.tasks.push({
				id: new Date().getTime(),
				task: this.task,
				done: false,
			})
			this.task = ''
		},
		toggleDone(id) {
			const task = this.tasks.find(task => task.id === id)
			task.done = !task.done
		},
		deleteTask(id) {
			this.tasks = this.tasks.filter(task => task.id !== id)
		},
		loadTasks() {
			const tasks = localStorage.getItem('tasks')
			if (tasks) {
				this.tasks = JSON.parse(tasks)
			}
		},
		saveTasks() {
			localStorage.setItem('tasks', JSON.stringify(this.tasks))
		},
	},
}

Vue.createApp(TasksApp).mount('#app')
