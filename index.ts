import inquirer from 'inquirer';
import * as emoji from 'node-emoji';
import chalk from 'chalk';

console.log(chalk.green.bold('Welcome to Your Own Todo App'), emoji.emojify('📋'));
let tasks: { id: number; description: any; status: string; }[] = [];
const addTask = async () => {
    let inputTask = await inquirer.prompt([
        {
            message: "Enter you task details:",
            name:"newTask",
            type: "string",
        }
    ])
    if (inputTask.newTask.length !== 0) {
        const task = {
            id: tasks.length + 1,
            description: inputTask.newTask,
            status: "Pending"
        }
        tasks.push(task);
        console.log(chalk.bgGreen("Your ask is added Sucessfully"));
    }
}
const viewTask = async() => {
    if (tasks.length === 0) {
        console.log(chalk.yellow('No tasks to display.'));
    } else {
        tasks.forEach(task => {
            console.log(`${task.id}. ${task.description} - ${task.status}`);
        });
    }
}
const deleteTask = async() => {
    if (tasks.length === 0) {
        console.log(chalk.yellow('No tasks to display.'));
        return;
    }
    const taskID = await inquirer.prompt([
        {
            name: "taskID",
            type: "number",
            message: "Enter the Task ID you want to delete: ",
        }
    ])
    const findIndex = tasks.findIndex(t => t.id == taskID.taskID);
    if (findIndex === -1) {
        console.log(chalk.red('Task not found.'));
        return;
    }
    tasks.splice(findIndex, 1);
    console.log(chalk.green('Task deleted successfully!'));
}
const updateTask = async () => {
    if (tasks.length === 0) {
        console.log(chalk.yellow('No tasks to update.'));
        return;
    }

    const { taskId } = await inquirer.prompt([
        {
            type: 'input',
            name: 'taskId',
            message: 'Enter the task ID to update:'
        }
    ]);

    const task = tasks.find(t => t.id == taskId);
    if (!task) {
        console.log(chalk.red('Task not found.'));
        return;
    }

    const { description, status } = await inquirer.prompt([
        {
            type: 'input',
            name: 'description',
            message: 'Enter the new description:',
            default: task.description
        },
        {
            type: 'list',
            name: 'status',
            message: 'Select the new status:',
            choices: ['pending', 'completed'],
            default: task.status
        }
    ]);

    task.description = description;
    task.status = status;
    console.log(chalk.green('Task updated successfully!'));
};

const main = async () => {
    while (true) {
        const userInput = await inquirer.prompt([
            {
                message: "Select Option to perform action",
                name: "option",
                type: "list",
                choices: [
                    "Add Tasks",
                    "View Tasks",
                    "Delete Tasks",
                    "Update Tasks",
                    "Exit"
                ],
            }
        ]);
        switch (userInput.option) {
            case 'Add Tasks':
                await addTask();
                break;
            case 'View Tasks':
                await viewTask();
                break;
            case 'Delete Tasks':
                await deleteTask();
                break;
            case 'Update Tasks':
                await updateTask();
                break;
            case 'Exit':
                console.log(chalk.blue('Goodbye!'));
                return;
            default:
                break;
        }
    }
}
main();
