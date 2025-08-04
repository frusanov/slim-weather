import { spawn } from 'child_process'
import { fileURLToPath } from 'url'
import { dirname, resolve } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const processes = []

function spawnProcess(command, args, name, color) {
  const proc = spawn(command, args, {
    stdio: 'pipe',
    cwd: __dirname
  })

  processes.push(proc)

  proc.stdout.on('data', (data) => {
    console.log(`\x1b[${color}m[${name}]\x1b[0m ${data.toString().trim()}`)
  })

  proc.stderr.on('data', (data) => {
    console.error(`\x1b[${color}m[${name}]\x1b[0m ${data.toString().trim()}`)
  })

  proc.on('close', (code) => {
    console.log(`\x1b[${color}m[${name}]\x1b[0m Process exited with code ${code}`)
  })

  return proc
}

// Graceful shutdown
process.on('SIGINT', () => {
  console.log('\n🛑 Shutting down development servers...')
  processes.forEach(proc => {
    proc.kill('SIGTERM')
  })
  process.exit(0)
})

console.log('🚀 Starting Slim Weather development environment...\n')

// 1. Build server in watch mode
spawnProcess('node', ['build-server.js', '--watch'], 'Server Build', '36') // Cyan

// 2. Build client systems in watch mode
spawnProcess('npx', ['vite', 'build', '--watch', '--mode', 'development'], 'Client Build', '33') // Yellow

// Wait a bit for builds to complete, then start server
setTimeout(() => {
  // 3. Start development server with hot reload
  spawnProcess('npx', ['tsx', '--watch', 'dev-server.ts'], 'Dev Server', '32') // Green
}, 2000)

console.log('📦 Building assets...')
console.log('🌐 Server will start at http://localhost:3000')
console.log('🔥 Hot reload enabled')
console.log('📁 Client systems will be available at /systems/\n')
