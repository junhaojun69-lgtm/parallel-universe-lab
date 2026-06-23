module.exports = {
  apps: [{
    name: 'universe-lab',
    script: 'src/app.js',
    cwd: '/opt/universe-lab/backend',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '512M',
    env: {
      NODE_ENV: 'production',
      PORT: 3000
    },
    error_file: '/var/log/universe-lab/error.log',
    out_file: '/var/log/universe-lab/out.log',
    log_date_format: 'YYYY-MM-DD HH:mm:ss',
    merge_logs: true,
    restart_delay: 3000,
    min_uptime: '10s',
    max_restarts: 10
  }]
}
