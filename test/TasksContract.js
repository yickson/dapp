const TasksContract = artifacts.require("TasksContract")

contract("TasksContract", () => {

    before(async () => {
        this.tasksContract = await TasksContract.deployed()
    })

    it('migrate deployed successfully', async () => {
        const address = this.tasksContract.address

        assert.notEqual(address, null)
        assert.notEqual(address, undefined)
        assert.notEqual(address, 0x0);
        assert.notEqual(address, "");
    })

    it('get Tasks List', async () => {
        const counter = await this.tasksContract.tasksCounter()
        const task = await this.tasksContract.tasks(counter)

        assert.equal(task.id.toNumber(), counter)
        assert.equal(task.title, 'Inicial')
        assert.equal(task.description, 'Describe')
        assert.equal(task.done, false)
        assert.equal(counter, 1)
    })

    it('task created successfully', async () => {
        const task = await this.tasksContract.createTask("Some Task", "Let's go Yickson")
        const taskEvent = task.logs[0].args;
        const taskCounter = await this.tasksContract.tasksCounter()

        assert.equal(taskCounter, 2);
        assert.equal(taskEvent.id.toNumber(), 2);
        assert.equal(taskEvent.title, "Some Task");
        assert.equal(taskEvent.description, "Let's go Yickson");
        assert.equal(taskEvent.done, false);
    })

    it('task toggle done', async () => {
        const toggle = await this.tasksContract.toggleDone(1);
        const taskEvent = toggle.logs[0].args;
        const task = await this.tasksContract.tasks(1);

        assert.equal(taskEvent.done, true);
        assert.equal(taskEvent.id, 1);
        assert.equal(task.done, true);
    })

})