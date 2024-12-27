var { execSync } = require('child_process');
const cron = require('node-cron');
const path = require('path');
const fs = require('fs');

// 获取当前日期和时间，并格式化为字符串
function getCurrentTimestamp() {
  const now = new Date();
  return now.toISOString().replace(/[:\-T]/g, '').slice(0, 15); // 格式如：20231004123045
}

// 创建备份目录（如果不存在）
const backupDir = path.join(__dirname, 'allBackups');
if (!fs.existsSync(backupDir)) {
    fs.mkdirSync(backupDir);
}

// 定义备份函数
function createBackup() {
    const timestamp = getCurrentTimestamp();
    const backupFilePath = path.join(backupDir, `backup_${timestamp}.sql`);
    const command = `mysqldump -uroot -p666llx666 ToyRentalManagementSystem > ${backupFilePath}`;

    try {
        execSync(command, { stdio: 'inherit' }); // 使用stdio: 'inherit'来继承父进程的标准输入输出
        console.log(`备份成功: ${backupFilePath}`);
    } catch (err) {
        console.error(`备份失败: ${err}`);
    }
}

// 设置定时任务，每天凌晨1:00执行一次
cron.schedule('0 1 * * *', () => {
    console.log("开始备份...");
    createBackup();
    console.log("备份结束");
});

console.log("定时备份任务已启动...");