// * 先定义数据库数据
var Salt = {
  name: 'database',
  version: 6, //数据库的版本号，随便写死的一个常量，避免后续数据库升级，我们用的简单就是存一些数据。
  db: null,
  table: 'Indexdatabase',
};

var INDEXDB = {
  openDB(name, version, table, callback) {
    //当用户强制清空浏览器缓存时，同时删除数据库，因为数据库数据积累太多会导致查询速度变慢。也需要定期清理
    var isHasallEleData = localStorage.getItem('isHasdatabase');
    if (isHasallEleData === null) {
      window.indexedDB.deleteDatabase(name);
    }
    var request = window.indexedDB.open(name, version);
    localStorage.setItem('isHasdatabase', 1);
    request.onerror = function (e) {
      console.log(e.currentTarget.error.message);
    };
    request.onsuccess = function (e) {
      Salt.db = e.target.result;
      if (callback && typeof callback === 'function') {
        callback(Salt.db);
      }
    };
    // * 第一次打开该数据库，或者数据库版本发生变化
    request.onupgradeneeded = function (e) {
      var db = e.target.result;
      if (!db.objectStoreNames.contains(table)) {
        db.createObjectStore(table, {
          keyPath: 'id',
        });
      }
    };
  },
  setItem(key, val) {
    INDEXDB.openDB(Salt.name, Salt.version, Salt.table, function () {
      try {
        var transaction = Salt.db.transaction(Salt.table, 'readwrite');
        var store = transaction.objectStore(Salt.table);

        // 检查是否已存在具有相同键的数据
        var getRequest = store.get(key);

        getRequest.onsuccess = function (e) {
          var existingData = e.target.result;

          if (existingData) {
            // 如果已存在，执行更新操作
            existingData.value = val;
            var updateRequest = store.put(existingData);

            updateRequest.onsuccess = function (e) {
              if (e.type === 'success') {
                INDEXDB.closeDB();
              }
            };
          } else {
            // 如果不存在，执行插入操作
            var addData = [
              {
                id: key,
                value: val,
              },
            ];

            for (var i = 0; i < addData.length; i++) {
              store.add(addData[i]);
            }

            INDEXDB.closeDB();
          }
        };
      } catch (error) {
        console.log(error);
      }
    });
  },
  async getItem(key) {
    return new Promise(async (resolve, reject) => {
      try {
        const data = await new Promise((innerResolve) => {
          INDEXDB.openDB(Salt.name, Salt.version, Salt.table, function () {
            var transaction = Salt.db.transaction(Salt.table, 'readwrite');
            var store = transaction.objectStore(Salt.table);

            var getRequest = store.get(key);

            getRequest.onsuccess = function (e) {
              var result = e.target.result;
              innerResolve(result ? result.value : null); // 如果有值，则解析为值；否则解析为null
              INDEXDB.closeDB();
            };

            getRequest.onerror = function (e) {
              console.error(e.target.error);
              innerResolve(null); // 如果发生错误，解析为null
            };
          });
        });

        resolve(data); // 解析Promise并返回值或undefined
      } catch (error) {
        console.error(error);
        reject(error);
      }
    });
  },
  getAllItem: function (back) {
    INDEXDB.openDB(Salt.name, Salt.version, Salt.table, function () {
      var transaction = Salt.db.transaction(Salt.table, 'readwrite');
      var store = transaction.objectStore(Salt.table);
      var request = store.openCursor();
      request.onsuccess = function (e) {
        if (back && typeof back === 'function') {
          if (e.target.result) {
            back(e.target.result);
          } else {
            back('');
          }
          INDEXDB.closeDB();
        }
      };
    });
  },
  putItem(key, value) {
    INDEXDB.openDB(Salt.name, Salt.version, Salt.table, function () {
      var transaction = Salt.db.transaction(Salt.table, 'readwrite');
      var store = transaction.objectStore(Salt.table);
      var request = store.get(key);
      request.onsuccess = function (e) {
        try {
          var resultData = e.target.result;
          resultData.value = value;
          var resultInfo = store.put(resultData);
          resultInfo.onsuccess = function (e) {
            if (e.type == 'success') {
              INDEXDB.closeDB();
            }
          };
        } catch (error) {
          INDEXDB.setItem(key, value);
        }
      };
    });
  },
  deleteItem(key) {
    INDEXDB.openDB(Salt.name, Salt.version, Salt.table, function () {
      var transaction = Salt.db.transaction(Salt.table, 'readwrite');
      var store = transaction.objectStore(Salt.table);
      var result = store.delete(key);
      result.onsuccess = function (e) {
        if (e.type == 'success') {
          INDEXDB.closeDB();
        }
      };
    });
  },
  closeDB() {
    Salt.db.close();
  },
};
// * 初始化数据库
INDEXDB.openDB(Salt.name, Salt.version, Salt.table);
export default INDEXDB;
