/**
 * PM2 配置文件 - 蜘蛛池网站
 *
 * 使用方法：
 * pm2 start ecosystem.config.js --env production
 * pm2 save
 * pm2 startup
 */

module.exports = {
  apps: [
    {
      name: 'spider-site',
      script: 'node',
      args: '.next/standalone/server.js',
      cwd: './',
      instances: 1,
      exec_mode: 'cluster',

      // 环境变量
      env_file: '.env.local',
      env: {
        NODE_ENV: 'production',
        PORT: 3000,
      },

      // 日志
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
      error_file: './logs/error.log',
      out_file: './logs/out.log',
      merge_logs: true,

      // 自动重启
      autorestart: true,
      max_restarts: 10,
      min_uptime: '10s',
      max_memory_restart: '500M',

      // 监听文件变化（开发环境）
      watch: false,
      ignore_watch: ['node_modules', 'logs', '.next'],
    },
  ],
};
