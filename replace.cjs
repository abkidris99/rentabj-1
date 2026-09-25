const fs = require('fs');
const path = require('path');

function walk(dir, done) {
  let results = [];
  fs.readdir(dir, function(err, list) {
    if (err) return done(err);
    let i = 0;
    (function next() {
      let file = list[i++];
      if (!file) return done(null, results);
      file = path.resolve(dir, file);
      fs.stat(file, function(err, stat) {
        if (stat && stat.isDirectory()) {
          if (file.includes('node_modules') || file.includes('dist') || file.includes('.git')) {
            next();
          } else {
            walk(file, function(err, res) {
              results = results.concat(res);
              next();
            });
          }
        } else {
          if (/\.(tsx|ts|html|xml|txt)$/.test(file)) {
            results.push(file);
          }
          next();
        }
      });
    })();
  });
}

walk('.', function(err, results) {
  if (err) throw err;
  results.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    let newContent = content.replace(/https:\/\/rentabj\.com/g, 'https://www.rentabj.com.ng')
                            .replace(/\(rentabj\.com\)/g, '(www.rentabj.com.ng)')
                            .replace(/admin@rentabj\.com/g, 'admin@rentabj.com.ng');
    if (content !== newContent) {
      fs.writeFileSync(file, newContent, 'utf8');
      console.log('Updated: ' + file);
    }
  });
});
