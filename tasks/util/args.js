import yargs from 'yargs';

const args = yargs

	.option('production',{
		boolean: true,
		default: false,
		describe: 'min all scripts'
	})

	.option('watch', {
		boolean: true,
		default: false,
		describe: 'watch all files'
	})

	.option('verbose',{
		boolean: true,
		default: false,
		describe: 'log'
	})

	.option('sourcemaps', {
		describe: 'force the creation of sroucemaps'
	})

	// 服务器端口
	.option('port', {
		string: true,
		default: 8080,
		describe: 'server port'
	})

	// 命令行以字符串解析
	.argv

// 切记
export default args;