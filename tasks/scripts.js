import gulp from 'gulp';
import gulpif from 'gulp-if';
import cancat from 'gulp-concat';
import webpack from 'webpack';
import gulpWebpack from 'webpack-stream';
import named from 'vinyl-named';
import livereload from 'gulp-livereload';
import plumber from 'gulp-plumber';
import rename from 'gulp-rename';
import uglify from 'gulp-uglify'; // 压缩js css
import { log, colors } from 'gulp-util';
import args from './util/args';// 命令行解析

gulp.task('script', () => {
	return gulp.src(['app/js/index.js'])
	.pipe(plumber({
		errorHandler: function(){

		}
	}))
	.pipe(named())
	.pipe(gulpWebpack({
		module:{
			loaders:[{
				test: /\.js$/,
				loader: 'babel'
			}]
		}
	}),null,(err,stats)=>{
		log(`Finished '${colors.cyan('scripts')}'`, stats, toString({
			chunks: false
		}))
	})
	.pipe(gulp.dest('server/public/js'))
	.pipe(rename({
		basename:'cp',
		extname: '.min.js'
	}))
	.pipe(uglify({compress: {properties: false}, output: {'quote_keys': true}}))
	.pipe(gulp.dest('server/public/js'))
	.pipe(gulpif(args.watch, livereload())) // 判断 是否有watch,有的话 就 热更新
})