module.exports = {
  apps: [
    {
      name: 'science_rap_prototype_project',
      script: 'npm run start',
      watch: false,
      instances: '1',
      exec_mode: 'fork',
      merge_logs: true,
      kill_timeout: 5000,
      restart_timeout: 5000,
      pmx: false,
      env: {
        NODE_ENV: 'local',
      },
      env_development: {
        NODE_ENV: 'development',
      },
      env_production: {
        NODE_ENV: 'production',
      },
    },
  ],
}
