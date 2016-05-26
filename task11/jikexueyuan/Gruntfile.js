module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        less: {
            task1: {
                options: {
                    compress: false,
                    yuicompress: false
                },
                files: {
                    "css/home.css": "css/home.less"
                }
            }
        },
        clean: {
            beforebuild: {
                files: [{
                    src: ['dist/', '.tmp/','css/home.css']
                }]
            }
        },
        filerev: {
            build: {
                files: [{
                    src: ['dist/css/**']
                }]
            }
        },
        useminPrepare: {
            build: {
                files: [{
                    src: 'index.html'
                }]
            }
        },
        usemin: {
            html: {
                files: [{
                    src: 'dist/index.html'
                }]
            },
            css: {
                files: [{
                    src: 'dist/css/*.css'
                }]
            }
        },
        copy: {
            build: {
                files: [{
                    expand: true,
                    cwd: '',
                    src: ['index.html'],
                    dest: 'dist/'
                }]
            },
            js: {
                flatten: true,
                expand: true,
                src: 'js/lib/*.js',
                dest: 'dist/js/lib/'
            },
            js2: {
                flatten: true,
                expand: true,
                src: 'js/*.js',
                dest: 'dist/js/'
            }
        },
        concat: {
            options: {
                separator: ';'
            },
            dist: {
                src: ['css/*.css'],
                dest: 'dist/css/home.css'
            }
        },
        imagemin: { // Task 
            static: { // Target 
                options: {
                    optimizationLevel: 3 //定义 PNG 图片优化水平
                },
                files: [{
                    expand: true,
                    src: ['img/*.{png,jpg,jpeg}'], // 优化 img 目录下所有 png/jpg/jpeg 图片
                    dest: 'dist' // 优化后的图片保存位置，覆盖旧图片，并且不作提示
                }]
            },
        },
    });

    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-usemin');
    grunt.loadNpmTasks('grunt-filerev');

    grunt.registerTask('default', [ 'clean:beforebuild','less', 'copy', 'useminPrepare', 'concat', 'cssmin', 'filerev', 'usemin', 'imagemin']);
};
