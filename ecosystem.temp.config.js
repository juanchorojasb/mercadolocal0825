module.exports = {
  apps: [{
    name: 'caldas',
    script: 'npm',
    args: 'start',
    cwd: '/root/caldas',
    instances: 1,  // Cambiar a 1 instancia para evitar conflictos
    exec_mode: 'fork', // Cambiar a fork mode
    env: {
      NODE_ENV: 'production',
      PORT: 3000
    },
    error_file: './logs/err.log',
    out_file: './logs/out.log',
    log_file: './logs/combined.log',
    time: true,
    max_memory_restart: '1G'
  }]
}
