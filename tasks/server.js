import gulp from 'gulp';
import gulpif from 'gulp-if';
import liverserver from 'gulp-live-server'; // 服务器启动脚本
// import livereload from 'gulp-livereload';
import args from './util/args';// 命令行解析

gulp.task('server', (cb) => {
    if(!args.watch) return cb();

    // --harmony 指当前目录下
    var server = liverserver.new(['--harmony', 'server/bin/www'])
    server.start();

    // server热更新
    gulp.watch(['server/public/**/*.js', 'server/views/**/*.ejs'], function(file){
        server.notify.apply(server, [file]);
    })

    // 监听需要重启服务的文件
    gulp.watch(['server/routes/**/*.js','server/app.js'], function(){
        server.start.bind(server)()
    })
  })