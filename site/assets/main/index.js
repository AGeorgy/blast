System.register("chunks:///_virtual/ActionBomb.ts", ['cc', './ActionResult.ts'], function (exports) {
  var cclegacy, ActionResult;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      ActionResult = module.ActionResult;
    }],
    execute: function () {
      cclegacy._RF.push({}, "5576apHFehCObz0s1XB2zrM", "ActionBomb", undefined);

      var ActionBomb = exports('ActionBomb', /*#__PURE__*/function () {
        function ActionBomb(radius) {
          this._radius = void 0;
          this._radius = radius;
        }

        var _proto = ActionBomb.prototype;

        _proto.execute = function execute(board, x, y) {
          console.log("ActioBomb execute", x, y);
          var tilesToRemove = this.getElementsInRadius(board, x, y, this._radius);
          board.removeTiles(tilesToRemove);
          return new ActionResult(tilesToRemove);
        };

        _proto.getElementsInRadius = function getElementsInRadius(board, xStart, yStart, size) {
          var x = 0;
          var y = 0;
          var direction = 0; // 0=RIGHT, 1=DOWN, 2=LEFT, 3=UP

          var chainSize = 1;
          x = xStart;
          y = yStart;
          size = size + 1;
          var tilesToRemove = [];

          for (var k = 1; k <= size - 1; k++) {
            for (var j = 0; j < (k < size - 1 ? 2 : 3); j++) {
              for (var i = 0; i < chainSize; i++) {
                if (x >= 0 && x < board.xMax && y >= 0 && y < board.yMax) {
                  tilesToRemove.push({
                    x: x,
                    y: y
                  });
                }

                switch (direction) {
                  case 0:
                    x++;
                    break;

                  case 1:
                    y--;
                    break;

                  case 2:
                    x--;
                    break;

                  case 3:
                    y++;
                    break;
                }
              }

              direction = (direction + 1) % 4;
            }

            chainSize = chainSize + 1;
          }

          if (x >= 0 && x < board.xMax && y >= 0 && y < board.yMax) {
            tilesToRemove.push({
              x: x,
              y: y
            });
          }

          return tilesToRemove;
        };

        return ActionBomb;
      }());

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/ActionPerformer.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './ActionRemoveBatchSameColor.ts'], function (exports) {
  var _createClass, cclegacy, ActionRemoveBatchSameColor;

  return {
    setters: [function (module) {
      _createClass = module.createClass;
    }, function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      ActionRemoveBatchSameColor = module.ActionRemoveBatchSameColor;
    }],
    execute: function () {
      cclegacy._RF.push({}, "6c783B8uENIPb9iUBSuZ1oW", "ActionPerformer", undefined);

      var ActionPerformer = exports('ActionPerformer', /*#__PURE__*/function () {
        function ActionPerformer(board, boardStats, batchSizeForDefaultAction) {
          this._board = void 0;
          this._boardStats = void 0;
          this._defaultAction = void 0;
          this._currentAction = void 0;
          this._isActionAllowed = void 0;
          this._observers = [];
          this._actions = new Map();
          this._board = board;
          this._boardStats = boardStats;
          this._defaultAction = new ActionRemoveBatchSameColor(batchSizeForDefaultAction);
          this.setDefaultAction();
        }

        var _proto = ActionPerformer.prototype;

        _proto.getCount = function getCount(action) {
          if (this._actions.has(action)) {
            return this._actions.get(action);
          }

          console.warn("ActionPerformer getCount", action, "not found in ", this._actions);
          return 0;
        };

        _proto.addAction = function addAction(action, amount) {
          this._actions.set(action, amount);
        };

        _proto.addObserver = function addObserver(observer) {
          this._observers.push(observer);
        };

        _proto.allowAction = function allowAction(isAllowed) {
          this._isActionAllowed = isAllowed;
        };

        _proto.setAction = function setAction(action) {
          console.log("ActionPerformer setAction", action);
          this._currentAction = action;
        };

        _proto.performActionOnCellAt = function performActionOnCellAt(x, y) {
          console.log("ActionPerformer performActionOnCellAt", x, y);

          if (!this._isActionAllowed) {
            return;
          }

          var executedCells = this._currentAction.execute(this._board, x, y);

          if (executedCells.isExecuted) {
            this._boardStats.increaseScore(executedCells.executedCells.length);

            this._boardStats.increaseTurn(); // reaction on action


            console.log("executedCells", executedCells.executedCells);
            this.decriseActionCount();
            this.setDefaultAction();
            this.notifyObservers();
          } else {
            // reaction on no action
            console.log("no action");
          }
        };

        _proto.decriseActionCount = function decriseActionCount() {
          console.log("ActionPerformer decriseActionCount", this._currentAction);

          if (this._actions.has(this._currentAction)) {
            var count = this._actions.get(this._currentAction);

            this._actions.set(this._currentAction, Math.max(count - 1, 0));
          }
        };

        _proto.setDefaultAction = function setDefaultAction() {
          this._currentAction = this._defaultAction;
        };

        _proto.notifyObservers = function notifyObservers() {
          this._observers.forEach(function (observer) {
            observer.notified();
          });
        };

        _createClass(ActionPerformer, [{
          key: "canDoDefaultAction",
          get: function get() {
            for (var y = 0; y < this._board.yMax; y++) {
              for (var x = 0; x < this._board.xMax; x++) {
                if (this._defaultAction.canExecute(this._board, x, y)) {
                  return true;
                }
              }
            }

            return false;
          }
        }, {
          key: "isActionAllowed",
          get: function get() {
            return this._isActionAllowed;
          }
        }]);

        return ActionPerformer;
      }());

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/ActionRemoveBatchSameColor.ts", ['cc', './ActionResult.ts'], function (exports) {
  var cclegacy, ActionResult;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      ActionResult = module.ActionResult;
    }],
    execute: function () {
      cclegacy._RF.push({}, "28ad07cSgxIXbvvhIfYcRIq", "ActionRemoveBatchSameColor", undefined);

      var ActionRemoveBatchSameColor = exports('ActionRemoveBatchSameColor', /*#__PURE__*/function () {
        function ActionRemoveBatchSameColor(minCellsInBath) {
          this._minCellsInBath = void 0;
          this._minCellsInBath = minCellsInBath;
        }

        var _proto = ActionRemoveBatchSameColor.prototype;

        _proto.canExecute = function canExecute(board, x, y) {
          console.log("ActionRemoveBatchSameColor canExecute");
          var tile = board.getTile(x, y);

          if (!tile) {
            return false;
          }

          var color = tile.color;
          var tilesToRemove = this.getTilesInRadiusWithColor(board, x, y, color);

          if (tilesToRemove.size >= this._minCellsInBath) {
            return true;
          }

          return false;
        };

        _proto.execute = function execute(board, x, y) {
          console.log("ActionRemoveBatchSameColor execute");
          return this.removeTilesInRadiusWithColor(board, x, y);
        };

        _proto.removeTilesInRadiusWithColor = function removeTilesInRadiusWithColor(board, x, y) {
          var color = board.getTile(x, y).color;
          var tilesToRemove = this.getTilesInRadiusWithColor(board, x, y, color);

          if (tilesToRemove.size >= this._minCellsInBath) {
            var tilesToRemoveArray = Array.from(tilesToRemove);
            board.removeTiles(tilesToRemoveArray);
            return new ActionResult(tilesToRemoveArray);
          }

          return new ActionResult();
        };

        _proto.getTilesInRadiusWithColor = function getTilesInRadiusWithColor(board, x, y, color) {
          var tilesToRemove = new Set();
          var tilesToCheck = [{
            x: x,
            y: y
          }];
          var visited = new Set();

          while (tilesToCheck.length > 0) {
            var tileToCheck = tilesToCheck.shift();
            var key = tileToCheck.x + "," + tileToCheck.y;

            if (!visited.has(key)) {
              var tile = board.getTile(tileToCheck.x, tileToCheck.y);

              if (tile && tile.color.equals(color)) {
                visited.add(key);
                tilesToRemove.add(tileToCheck);
                tilesToCheck.push.apply(tilesToCheck, this.getNeighbours(board, tileToCheck.x, tileToCheck.y));
              }
            }
          }

          return tilesToRemove;
        };

        _proto.getNeighbours = function getNeighbours(board, x, y) {
          var neighbours = [];

          if (x > 0) {
            neighbours.push({
              x: x - 1,
              y: y
            });
          }

          if (x < board.xMax - 1) {
            neighbours.push({
              x: x + 1,
              y: y
            });
          }

          if (y > 0) {
            neighbours.push({
              x: x,
              y: y - 1
            });
          }

          if (y < board.yMax - 1) {
            neighbours.push({
              x: x,
              y: y + 1
            });
          }

          return neighbours;
        };

        return ActionRemoveBatchSameColor;
      }());

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/ActionResult.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  var _createClass, cclegacy;

  return {
    setters: [function (module) {
      _createClass = module.createClass;
    }, function (module) {
      cclegacy = module.cclegacy;
    }],
    execute: function () {
      cclegacy._RF.push({}, "a9b38IpGb5HvbT//YlfFFud", "ActionResult", undefined);

      var ActionResult = exports('ActionResult', /*#__PURE__*/function () {
        function ActionResult(executedCells) {
          if (executedCells === void 0) {
            executedCells = [];
          }

          this._executedCells = void 0;
          this._isExecuted = void 0;
          this._executedCells = executedCells;
          this._isExecuted = executedCells.length > 0;
        }

        _createClass(ActionResult, [{
          key: "executedCells",
          get: function get() {
            return this._executedCells;
          }
        }, {
          key: "isExecuted",
          get: function get() {
            return this._isExecuted;
          }
        }]);

        return ActionResult;
      }());

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/AllowActionStage.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  var _createClass, cclegacy;

  return {
    setters: [function (module) {
      _createClass = module.createClass;
    }, function (module) {
      cclegacy = module.cclegacy;
    }],
    execute: function () {
      cclegacy._RF.push({}, "078bci4gNBACbm977XBwa7Y", "AllowActionStage", undefined);

      var AllowActionStage = exports('AllowActionStage', /*#__PURE__*/function () {
        function AllowActionStage(isAllow, boardActionAllower) {
          this._boardActionAllower = void 0;
          this._isAllow = void 0;
          this._isStarted = false;
          this._isDone = false;
          this._isAllow = isAllow;
          this._boardActionAllower = boardActionAllower;
        }

        var _proto = AllowActionStage.prototype;

        _proto.reset = function reset() {
          this._isStarted = false;
          this._isDone = false;
        };

        _proto.execute = function execute() {
          this._isStarted = true;
          console.log("AllowActionStage execute");

          this._boardActionAllower.allowAction(this._isAllow);

          this._isDone = true;
        };

        _createClass(AllowActionStage, [{
          key: "isStarted",
          get: function get() {
            return this._isStarted;
          }
        }, {
          key: "isDone",
          get: function get() {
            return this._isDone;
          }
        }]);

        return AllowActionStage;
      }());

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/Binder.ts", ['cc'], function (exports) {
  var cclegacy;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }],
    execute: function () {
      cclegacy._RF.push({}, "4b0a7mu4VJKCb/lq+NbhMKs", "Binder", undefined); // TODO: dont know yet how to bind model and view in CocosCreator better than this


      var Binder = exports('Binder', /*#__PURE__*/function () {
        function Binder() {
          this._bindings = new Map();
        }

        Binder.getInstance = function getInstance() {
          if (!Binder.instance) {
            Binder.instance = new Binder();
          }

          return Binder.instance;
        };

        var _proto = Binder.prototype;

        _proto.resolve = function resolve(type) {
          return Binder.instance._bindings.get(type);
        };

        _proto.addBinding = function addBinding(type, instance) {
          if (this._bindings.has(type)) {
            return;
          }

          this._bindings.set(type, instance);
        };

        _proto.clear = function clear() {
          this._bindings.clear();
        };

        return Binder;
      }());
      Binder.instance = void 0;

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/Board.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './Tile.ts', './IBoardLastChanged.ts'], function (exports) {
  var _createClass, cclegacy, Tile, TilesChange;

  return {
    setters: [function (module) {
      _createClass = module.createClass;
    }, function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      Tile = module.Tile;
    }, function (module) {
      TilesChange = module.TilesChange;
    }],
    execute: function () {
      cclegacy._RF.push({}, "c3e3dc5bXRLtJMVZVvqBHi/", "Board", undefined);

      var Board = exports('Board', /*#__PURE__*/function () {
        function Board(xMax, yMax, colorPalette) {
          this._tiles = void 0;
          this._xMax = void 0;
          this._yMax = void 0;
          this._colorPalette = void 0;
          this._observers = void 0;
          this._lastChangedTiles = null;
          this._xMax = xMax;
          this._yMax = yMax;
          this._colorPalette = colorPalette;
          this._tiles = new Array(xMax * yMax);
          this._observers = [];
        }

        var _proto = Board.prototype;

        _proto.addObserver = function addObserver(observer) {
          this._observers.push(observer);

          this._lastChangedTiles = this.prepareAllTilesForNotify(TilesChange.Added);
          observer.notified();
        };

        _proto.getTile = function getTile(x, y) {
          return this._tiles[x + y * this._xMax];
        };

        _proto.removeTiles = function removeTiles(tilesToRemove) {
          var _this = this;

          console.log("Board removeTile");
          var tiles = tilesToRemove.map(function (_ref) {
            var x = _ref.x,
                y = _ref.y;

            var index = _this.codePositionToIndex(x, y);

            var tile = _this._tiles[index];
            _this._tiles[index] = null;
            return tile;
          });
          this._lastChangedTiles = {
            change: TilesChange.Removed,
            tiles: tiles
          };
          this.notifyObservers();
        };

        _proto.fill = function fill() {
          console.log("Board fill");
          var tiles = [];

          for (var y = 0; y < this._yMax; y++) {
            for (var x = 0; x < this._xMax; x++) {
              var index = this.codePositionToIndex(x, y);

              if (!this._tiles[index]) {
                var tile = new Tile(x, y, this._colorPalette.getRandomColor());
                this._tiles[index] = tile;
                tiles.push(tile);
              }
            }
          }

          this._lastChangedTiles = {
            change: TilesChange.Added,
            tiles: tiles
          };
          this.notifyObservers();
        };

        _proto.shiftDown = function shiftDown() {
          console.log("Board shiftDown");
          var movedTiles = new Map();

          for (var x = 0; x < this._xMax; x++) {
            var shiftsInRow = 0;

            for (var y = 0; y < this._yMax; y++) {
              var index = this.codePositionToIndex(x, y);

              while (this._tiles[index] === null && shiftsInRow + y < this._yMax) {
                this.shiftRowDown(x, y, movedTiles);
                shiftsInRow++;
              }
            }
          }

          this._lastChangedTiles = {
            change: TilesChange.Moved,
            tiles: Array.from(movedTiles.values())
          };
          this.notifyObservers();
        };

        _proto.shiftRowDown = function shiftRowDown(xPos, yPos, movedTiles) {
          for (var y = yPos; y < this._yMax - 1; y++) {
            var index = this.codePositionToIndex(xPos, y);
            var upIndex = this.codePositionToIndex(xPos, y + 1);
            var upTile = this._tiles[upIndex];
            var currentTile = this._tiles[index];
            this._tiles[upIndex] = currentTile;
            this._tiles[index] = upTile;

            if (upTile) {
              movedTiles.set(upTile.id, upTile);
              upTile.setPosition({
                x: xPos,
                y: y
              });
            }
          }
        };

        _proto.shuffle = function shuffle() {
          console.log("Board shuffle");
          var currentIndex = this._tiles.length;

          while (currentIndex != 0) {
            var _this$_tiles$currentI, _this$_tiles$randomIn;

            var randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;
            var _ref2 = [this._tiles[randomIndex], this._tiles[currentIndex]];
            this._tiles[currentIndex] = _ref2[0];
            this._tiles[randomIndex] = _ref2[1];
            (_this$_tiles$currentI = this._tiles[currentIndex]) == null ? void 0 : _this$_tiles$currentI.setPosition(this.decodeIndexToPosition(currentIndex));
            (_this$_tiles$randomIn = this._tiles[randomIndex]) == null ? void 0 : _this$_tiles$randomIn.setPosition(this.decodeIndexToPosition(randomIndex));
          }

          this._lastChangedTiles = this.prepareAllTilesForNotify(TilesChange.Moved);
          this.notifyObservers();
        };

        _proto.notifyObservers = function notifyObservers() {
          this._observers.map(function (observer) {
            return observer.notified();
          });
        };

        _proto.codePositionToIndex = function codePositionToIndex(x, y) {
          return x + y * this._xMax;
        };

        _proto.decodeIndexToPosition = function decodeIndexToPosition(index) {
          return {
            x: index % this._xMax,
            y: Math.floor(index / this._xMax)
          };
        };

        _proto.prepareAllTilesForNotify = function prepareAllTilesForNotify(change) {
          var tiles = this._tiles.map(function (tile) {
            return tile;
          });

          return {
            change: change,
            tiles: tiles
          };
        };

        _createClass(Board, [{
          key: "xMax",
          get: function get() {
            return this._xMax;
          }
        }, {
          key: "yMax",
          get: function get() {
            return this._yMax;
          }
        }, {
          key: "lastChangedTiles",
          get: function get() {
            return this._lastChangedTiles;
          }
        }]);

        return Board;
      }());

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/BoardComponent.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './Binder.ts', './IBoardLastChanged.ts', './ObjectPool.ts'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, Prefab, Node, UITransform, math, Layout, Component, Binder, TilesChange, ObjectPool;

  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Prefab = module.Prefab;
      Node = module.Node;
      UITransform = module.UITransform;
      math = module.math;
      Layout = module.Layout;
      Component = module.Component;
    }, function (module) {
      Binder = module.Binder;
    }, function (module) {
      TilesChange = module.TilesChange;
    }, function (module) {
      ObjectPool = module.ObjectPool;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _class, _class2, _descriptor, _descriptor2;

      cclegacy._RF.push({}, "ae1d62VsjlLjJ5aZ5T7EOWo", "BoardComponent", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;
      var BoardComponent = exports('BoardComponent', (_dec = ccclass('BoardComponent'), _dec2 = property(Prefab), _dec3 = property(Node), _dec(_class = (_class2 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(BoardComponent, _Component);

        function BoardComponent() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;

          _initializerDefineProperty(_this, "tilePrefab", _descriptor, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "content", _descriptor2, _assertThisInitialized(_this));

          _this._board = void 0;
          _this._tiles = new Map();
          _this._contentTransform = void 0;
          _this._tileWidth = void 0;
          _this._tileHeight = void 0;
          _this._pool = void 0;
          return _this;
        }

        var _proto = BoardComponent.prototype;

        _proto.onLoad = function onLoad() {
          if (!this.tilePrefab) {
            throw new Error('Prefab is null');
          }

          this._contentTransform = this.content.getComponent(UITransform);
          var binder = Binder.getInstance();
          this._board = binder.resolve("IBoardDataAndAddNotifier");
          this._pool = new ObjectPool(this.tilePrefab, this.content, this._board.xMax * this._board.yMax, "TileComponent");
          this.adjustSize();

          this._board.addObserver(this);
        };

        _proto.adjustSize = function adjustSize() {
          var squareTileSize = math.bits.min(this._contentTransform.contentSize.width / this._board.xMax, this._contentTransform.contentSize.height / this._board.yMax);
          this._contentTransform.contentSize = new math.Size(squareTileSize * this._board.xMax + 0.1, squareTileSize * this._board.yMax);
          this._tileWidth = squareTileSize;
          this._tileHeight = squareTileSize;
          this.getComponents(Layout).forEach(function (layout) {
            layout.updateLayout();
          });
        };

        _proto.notified = function notified() {
          console.log("BoardComponent notified");
          this.updateTiles();
        };

        _proto.updateTiles = function updateTiles() {
          var _this2 = this;

          var lastChanges = this._board.lastChangedTiles;

          switch (lastChanges.change) {
            case TilesChange.Removed:
              console.log("BoardComponent updateTiles: Removed");
              lastChanges.tiles.forEach(function (tileModel) {
                var tileNode = _this2._tiles.get(tileModel.id);

                tileNode.pool(_this2._pool);

                _this2._tiles["delete"](tileModel.id);
              });
              break;

            case TilesChange.Added:
              console.log("BoardComponent updateTiles: Added");
              lastChanges.tiles.forEach(function (tileModel) {
                _this2.setTileComponent(tileModel, _this2._pool.borrow());
              });
              break;

            case TilesChange.Moved:
              console.log("BoardComponent updateTiles: Moved");
              lastChanges.tiles.forEach(function (tileModel) {
                var tileNode = _this2._tiles.get(tileModel.id);

                var position = _this2.transformGridToUiPosition(tileModel.x, tileModel.y);

                tileNode.moveTo(position.x, _this2.getUiYPosition(position.y));
              });
              break;
          }
        };

        _proto.setTileComponent = function setTileComponent(tileModel, tileNode) {
          this._tiles.set(tileModel.id, tileNode);

          tileNode.node.parent = this.content;
          tileNode.init(tileModel);
          this.setTileSize(tileNode);
          var position = this.transformGridToUiPosition(tileModel.x, tileModel.y);
          console.log("BoardComponent setTileComponent: " + position.x + ", " + position.y);
          tileNode.node.setPosition(position.x, position.y);
          tileNode.moveTo(position.x, this.getUiYPosition(position.y));
        };

        _proto.transformGridToUiPosition = function transformGridToUiPosition(x, y) {
          var xPosition = x * this._tileWidth + this._tileWidth / 2;
          var yPosition = y * this._tileHeight + this._tileHeight / 2;
          console.log("BoardComponent transformGridToUiPosition: " + xPosition + ", " + yPosition);
          return {
            x: xPosition,
            y: yPosition
          };
        };

        _proto.setTileSize = function setTileSize(tile) {
          console.log("BoardComponent setTileSize: " + this._tileWidth + ", " + this._tileHeight);
          var tileTransform = tile.getComponent(UITransform);
          tileTransform.height = this._tileHeight;
          tileTransform.width = this._tileWidth;
        };

        _proto.getUiYPosition = function getUiYPosition(y) {
          return y - this._board.yMax * this._tileHeight;
        };

        return BoardComponent;
      }(Component), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "tilePrefab", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "content", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      })), _class2)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/BoardStats.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  var _createClass, cclegacy;

  return {
    setters: [function (module) {
      _createClass = module.createClass;
    }, function (module) {
      cclegacy = module.cclegacy;
    }],
    execute: function () {
      cclegacy._RF.push({}, "42a90Ai8HhL87V1FUcPuHHf", "BoardStats", undefined);

      var BoardStats = exports('BoardStats', /*#__PURE__*/function () {
        function BoardStats(maxTurns, targetScore, maxShuffleCount) {
          this._maxTurns = void 0;
          this._currentTurns = void 0;
          this._targetScore = void 0;
          this._currentScore = void 0;
          this._maxShuffleCount = void 0;
          this._currentShuffleCount = void 0;
          this._observers = void 0;
          this._maxTurns = maxTurns;
          this._targetScore = targetScore;
          this._maxShuffleCount = maxShuffleCount;
          this._currentTurns = 0;
          this._currentScore = 0;
          this._currentShuffleCount = 0;
          this._observers = [];
        }

        var _proto = BoardStats.prototype;

        _proto.addObserver = function addObserver(observer) {
          this._observers.push(observer);

          observer.notified();
        };

        _proto.increaseTurn = function increaseTurn() {
          console.log("BoardStats increaseTurn");
          this._currentTurns++;
          this.notifyObservers();
        };

        _proto.increaseScore = function increaseScore(removedTiles) {
          console.log("BoardStats increaseScore");
          this._currentScore += removedTiles * 2;
          this.notifyObservers();
        };

        _proto.increaseShuffle = function increaseShuffle() {
          console.log("BoardStats increaseShuffle");
          this._currentShuffleCount++;
          this.notifyObservers();
        };

        _proto.notifyObservers = function notifyObservers() {
          this._observers.map(function (observer) {
            return observer.notified();
          });
        };

        _createClass(BoardStats, [{
          key: "maxTurns",
          get: function get() {
            return this._maxTurns;
          }
        }, {
          key: "currentTurns",
          get: function get() {
            return this._currentTurns;
          }
        }, {
          key: "targetScore",
          get: function get() {
            return this._targetScore;
          }
        }, {
          key: "currentScore",
          get: function get() {
            return this._currentScore;
          }
        }, {
          key: "maxShuffleCount",
          get: function get() {
            return this._maxShuffleCount;
          }
        }, {
          key: "currentShuffleCount",
          get: function get() {
            return this._currentShuffleCount;
          }
        }, {
          key: "canShuffle",
          get: function get() {
            return this._currentShuffleCount < this._maxShuffleCount;
          }
        }, {
          key: "ifWin",
          get: function get() {
            return this._currentScore >= this._targetScore && this._currentTurns < this._maxTurns;
          }
        }, {
          key: "ifLost",
          get: function get() {
            return this._currentTurns >= this._maxTurns && this._currentScore < this._targetScore;
          }
        }]);

        return BoardStats;
      }());

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/BombBoosterComponent.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './ActionBomb.ts', './BonusComponent.ts', './Binder.ts'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, CCString, CCInteger, Component, ActionBomb, BonusComponent, Binder;

  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      CCString = module.CCString;
      CCInteger = module.CCInteger;
      Component = module.Component;
    }, function (module) {
      ActionBomb = module.ActionBomb;
    }, function (module) {
      BonusComponent = module.BonusComponent;
    }, function (module) {
      Binder = module.Binder;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _dec5, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4;

      cclegacy._RF.push({}, "5a7d4PXr7lA86IXy6UlnsBT", "BombBoosterComponent", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;
      var BombBoosterComponent = exports('BombBoosterComponent', (_dec = ccclass('BombBoosterComponent'), _dec2 = property(CCString), _dec3 = property(CCInteger), _dec4 = property(CCInteger), _dec5 = property(BonusComponent), _dec(_class = (_class2 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(BombBoosterComponent, _Component);

        function BombBoosterComponent() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;

          _initializerDefineProperty(_this, "boosterName", _descriptor, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "amount", _descriptor2, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "radius", _descriptor3, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "bonusComponent", _descriptor4, _assertThisInitialized(_this));

          _this._action = void 0;
          _this._actionProvider = void 0;
          return _this;
        }

        var _proto = BombBoosterComponent.prototype;

        _proto.onLoad = function onLoad() {
          if (!this.bonusComponent) {
            throw new Error('bonusComponent is null');
          }

          this.bonusComponent.setBoosterName(this.boosterName);
          this.bonusComponent.setCount(this.amount);
          var binder = Binder.getInstance();
          this._actionProvider = binder.resolve("ISetAddActionObserverGetCount");
          this._action = new ActionBomb(this.radius);

          this._actionProvider.addAction(this._action, this.amount);

          this._actionProvider.addObserver(this);
        };

        _proto.setBooster = function setBooster() {
          this._actionProvider.setAction(this._action);
        };

        _proto.notified = function notified() {
          this.bonusComponent.setCount(this._actionProvider.getCount(this._action));
        };

        return BombBoosterComponent;
      }(Component), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "boosterName", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return '';
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "amount", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 2;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "radius", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 2;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "bonusComponent", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      })), _class2)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/BonusComponent.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, Button, Label, Component;

  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Button = module.Button;
      Label = module.Label;
      Component = module.Component;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _class, _class2, _descriptor, _descriptor2, _descriptor3;

      cclegacy._RF.push({}, "072e45XyYhMdLjcxj2C6C56", "BonusComponent", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;
      var BonusComponent = exports('BonusComponent', (_dec = ccclass('BonusComponent'), _dec2 = property(Button), _dec3 = property(Label), _dec4 = property(Label), _dec(_class = (_class2 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(BonusComponent, _Component);

        function BonusComponent() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;

          _initializerDefineProperty(_this, "button", _descriptor, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "nameText", _descriptor2, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "countText", _descriptor3, _assertThisInitialized(_this));

          return _this;
        }

        var _proto = BonusComponent.prototype;

        _proto.onLoad = function onLoad() {
          if (!this.nameText) {
            throw new Error('nameText is null');
          }

          if (!this.countText) {
            throw new Error('countText is null');
          }
        };

        _proto.setBoosterName = function setBoosterName(name) {
          this.nameText.string = name;
        };

        _proto.setCount = function setCount(count) {
          this.countText.string = count.toString();
          this.button.interactable = count > 0;
        };

        return BonusComponent;
      }(Component), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "button", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "nameText", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "countText", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      })), _class2)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/ColorPalette.ts", ['cc'], function (exports) {
  var cclegacy, Color;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
      Color = module.Color;
    }],
    execute: function () {
      cclegacy._RF.push({}, "d5518lRAUlLRIl4EfAeK+90", "ColorPalette", undefined);

      var ColorPalette = exports('ColorPalette', /*#__PURE__*/function () {
        function ColorPalette(colors) {
          if (colors === void 0) {
            colors = [Color.WHITE];
          }

          this._colors = void 0;
          this._colors = colors;
        }

        var _proto = ColorPalette.prototype;

        _proto.getRandomColor = function getRandomColor() {
          return this._colors[Math.floor(Math.random() * this._colors.length)];
        };

        return ColorPalette;
      }());

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/debug-view-runtime-control.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, Node, Color, Canvas, UITransform, instantiate, Label, RichText, Toggle, Button, director, Component;

  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Node = module.Node;
      Color = module.Color;
      Canvas = module.Canvas;
      UITransform = module.UITransform;
      instantiate = module.instantiate;
      Label = module.Label;
      RichText = module.RichText;
      Toggle = module.Toggle;
      Button = module.Button;
      director = module.director;
      Component = module.Component;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _class, _class2, _descriptor, _descriptor2, _descriptor3;

      cclegacy._RF.push({}, "b2bd1+njXxJxaFY3ymm06WU", "debug-view-runtime-control", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;
      var DebugViewRuntimeControl = exports('DebugViewRuntimeControl', (_dec = ccclass('internal.DebugViewRuntimeControl'), _dec2 = property(Node), _dec3 = property(Node), _dec4 = property(Node), _dec(_class = (_class2 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(DebugViewRuntimeControl, _Component);

        function DebugViewRuntimeControl() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;

          _initializerDefineProperty(_this, "compositeModeToggle", _descriptor, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "singleModeToggle", _descriptor2, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "EnableAllCompositeModeButton", _descriptor3, _assertThisInitialized(_this));

          _this._single = 0;
          _this.strSingle = ['No Single Debug', 'Vertex Color', 'Vertex Normal', 'Vertex Tangent', 'World Position', 'Vertex Mirror', 'Face Side', 'UV0', 'UV1', 'UV Lightmap', 'Project Depth', 'Linear Depth', 'Fragment Normal', 'Fragment Tangent', 'Fragment Binormal', 'Base Color', 'Diffuse Color', 'Specular Color', 'Transparency', 'Metallic', 'Roughness', 'Specular Intensity', 'IOR', 'Direct Diffuse', 'Direct Specular', 'Direct All', 'Env Diffuse', 'Env Specular', 'Env All', 'Emissive', 'Light Map', 'Shadow', 'AO', 'Fresnel', 'Direct Transmit Diffuse', 'Direct Transmit Specular', 'Env Transmit Diffuse', 'Env Transmit Specular', 'Transmit All', 'Direct Internal Specular', 'Env Internal Specular', 'Internal All', 'Fog'];
          _this.strComposite = ['Direct Diffuse', 'Direct Specular', 'Env Diffuse', 'Env Specular', 'Emissive', 'Light Map', 'Shadow', 'AO', 'Normal Map', 'Fog', 'Tone Mapping', 'Gamma Correction', 'Fresnel', 'Transmit Diffuse', 'Transmit Specular', 'Internal Specular', 'TT'];
          _this.strMisc = ['CSM Layer Coloration', 'Lighting With Albedo'];
          _this.compositeModeToggleList = [];
          _this.singleModeToggleList = [];
          _this.miscModeToggleList = [];
          _this.textComponentList = [];
          _this.labelComponentList = [];
          _this.textContentList = [];
          _this.hideButtonLabel = void 0;
          _this._currentColorIndex = 0;
          _this.strColor = ['<color=#ffffff>', '<color=#000000>', '<color=#ff0000>', '<color=#00ff00>', '<color=#0000ff>'];
          _this.color = [Color.WHITE, Color.BLACK, Color.RED, Color.GREEN, Color.BLUE];
          return _this;
        }

        var _proto = DebugViewRuntimeControl.prototype;

        _proto.start = function start() {
          // get canvas resolution
          var canvas = this.node.parent.getComponent(Canvas);

          if (!canvas) {
            console.error('debug-view-runtime-control should be child of Canvas');
            return;
          }

          var uiTransform = this.node.parent.getComponent(UITransform);
          var halfScreenWidth = uiTransform.width * 0.5;
          var halfScreenHeight = uiTransform.height * 0.5;
          var x = -halfScreenWidth + halfScreenWidth * 0.1,
              y = halfScreenHeight - halfScreenHeight * 0.1;
          var width = 200,
              height = 20; // new nodes

          var miscNode = this.node.getChildByName('MiscMode');
          var buttonNode = instantiate(miscNode);
          buttonNode.parent = this.node;
          buttonNode.name = 'Buttons';
          var titleNode = instantiate(miscNode);
          titleNode.parent = this.node;
          titleNode.name = 'Titles'; // title

          for (var i = 0; i < 2; i++) {
            var newLabel = instantiate(this.EnableAllCompositeModeButton.getChildByName('Label'));
            newLabel.setPosition(x + (i > 0 ? 50 + width * 2 : 150), y, 0.0);
            newLabel.setScale(0.75, 0.75, 0.75);
            newLabel.parent = titleNode;

            var _labelComponent = newLabel.getComponent(Label);

            _labelComponent.string = i ? '----------Composite Mode----------' : '----------Single Mode----------';
            _labelComponent.color = Color.WHITE;
            _labelComponent.overflow = 0;
            this.labelComponentList[this.labelComponentList.length] = _labelComponent;
          }

          y -= height; // single

          var currentRow = 0;

          for (var _i = 0; _i < this.strSingle.length; _i++, currentRow++) {
            if (_i === this.strSingle.length >> 1) {
              x += width;
              currentRow = 0;
            }

            var newNode = _i ? instantiate(this.singleModeToggle) : this.singleModeToggle;
            newNode.setPosition(x, y - height * currentRow, 0.0);
            newNode.setScale(0.5, 0.5, 0.5);
            newNode.parent = this.singleModeToggle.parent;
            var textComponent = newNode.getComponentInChildren(RichText);
            textComponent.string = this.strSingle[_i];
            this.textComponentList[this.textComponentList.length] = textComponent;
            this.textContentList[this.textContentList.length] = textComponent.string;
            newNode.on(Toggle.EventType.TOGGLE, this.toggleSingleMode, this);
            this.singleModeToggleList[_i] = newNode;
          }

          x += width; // buttons

          this.EnableAllCompositeModeButton.setPosition(x + 15, y, 0.0);
          this.EnableAllCompositeModeButton.setScale(0.5, 0.5, 0.5);
          this.EnableAllCompositeModeButton.on(Button.EventType.CLICK, this.enableAllCompositeMode, this);
          this.EnableAllCompositeModeButton.parent = buttonNode;
          var labelComponent = this.EnableAllCompositeModeButton.getComponentInChildren(Label);
          this.labelComponentList[this.labelComponentList.length] = labelComponent;
          var changeColorButton = instantiate(this.EnableAllCompositeModeButton);
          changeColorButton.setPosition(x + 90, y, 0.0);
          changeColorButton.setScale(0.5, 0.5, 0.5);
          changeColorButton.on(Button.EventType.CLICK, this.changeTextColor, this);
          changeColorButton.parent = buttonNode;
          labelComponent = changeColorButton.getComponentInChildren(Label);
          labelComponent.string = 'TextColor';
          this.labelComponentList[this.labelComponentList.length] = labelComponent;
          var HideButton = instantiate(this.EnableAllCompositeModeButton);
          HideButton.setPosition(x + 200, y, 0.0);
          HideButton.setScale(0.5, 0.5, 0.5);
          HideButton.on(Button.EventType.CLICK, this.hideUI, this);
          HideButton.parent = this.node.parent;
          labelComponent = HideButton.getComponentInChildren(Label);
          labelComponent.string = 'Hide UI';
          this.labelComponentList[this.labelComponentList.length] = labelComponent;
          this.hideButtonLabel = labelComponent; // misc

          y -= 40;

          for (var _i2 = 0; _i2 < this.strMisc.length; _i2++) {
            var _newNode = instantiate(this.compositeModeToggle);

            _newNode.setPosition(x, y - height * _i2, 0.0);

            _newNode.setScale(0.5, 0.5, 0.5);

            _newNode.parent = miscNode;

            var _textComponent = _newNode.getComponentInChildren(RichText);

            _textComponent.string = this.strMisc[_i2];
            this.textComponentList[this.textComponentList.length] = _textComponent;
            this.textContentList[this.textContentList.length] = _textComponent.string;

            var toggleComponent = _newNode.getComponent(Toggle);

            toggleComponent.isChecked = _i2 ? true : false;

            _newNode.on(Toggle.EventType.TOGGLE, _i2 ? this.toggleLightingWithAlbedo : this.toggleCSMColoration, this);

            this.miscModeToggleList[_i2] = _newNode;
          } // composite


          y -= 150;

          for (var _i3 = 0; _i3 < this.strComposite.length; _i3++) {
            var _newNode2 = _i3 ? instantiate(this.compositeModeToggle) : this.compositeModeToggle;

            _newNode2.setPosition(x, y - height * _i3, 0.0);

            _newNode2.setScale(0.5, 0.5, 0.5);

            _newNode2.parent = this.compositeModeToggle.parent;

            var _textComponent2 = _newNode2.getComponentInChildren(RichText);

            _textComponent2.string = this.strComposite[_i3];
            this.textComponentList[this.textComponentList.length] = _textComponent2;
            this.textContentList[this.textContentList.length] = _textComponent2.string;

            _newNode2.on(Toggle.EventType.TOGGLE, this.toggleCompositeMode, this);

            this.compositeModeToggleList[_i3] = _newNode2;
          }
        };

        _proto.isTextMatched = function isTextMatched(textUI, textDescription) {
          var tempText = new String(textUI);
          var findIndex = tempText.search('>');

          if (findIndex === -1) {
            return textUI === textDescription;
          } else {
            tempText = tempText.substr(findIndex + 1);
            tempText = tempText.substr(0, tempText.search('<'));
            return tempText === textDescription;
          }
        };

        _proto.toggleSingleMode = function toggleSingleMode(toggle) {
          var debugView = director.root.debugView;
          var textComponent = toggle.getComponentInChildren(RichText);

          for (var i = 0; i < this.strSingle.length; i++) {
            if (this.isTextMatched(textComponent.string, this.strSingle[i])) {
              debugView.singleMode = i;
            }
          }
        };

        _proto.toggleCompositeMode = function toggleCompositeMode(toggle) {
          var debugView = director.root.debugView;
          var textComponent = toggle.getComponentInChildren(RichText);

          for (var i = 0; i < this.strComposite.length; i++) {
            if (this.isTextMatched(textComponent.string, this.strComposite[i])) {
              debugView.enableCompositeMode(i, toggle.isChecked);
            }
          }
        };

        _proto.toggleLightingWithAlbedo = function toggleLightingWithAlbedo(toggle) {
          var debugView = director.root.debugView;
          debugView.lightingWithAlbedo = toggle.isChecked;
        };

        _proto.toggleCSMColoration = function toggleCSMColoration(toggle) {
          var debugView = director.root.debugView;
          debugView.csmLayerColoration = toggle.isChecked;
        };

        _proto.enableAllCompositeMode = function enableAllCompositeMode(button) {
          var debugView = director.root.debugView;
          debugView.enableAllCompositeMode(true);

          for (var i = 0; i < this.compositeModeToggleList.length; i++) {
            var _toggleComponent = this.compositeModeToggleList[i].getComponent(Toggle);

            _toggleComponent.isChecked = true;
          }

          var toggleComponent = this.miscModeToggleList[0].getComponent(Toggle);
          toggleComponent.isChecked = false;
          debugView.csmLayerColoration = false;
          toggleComponent = this.miscModeToggleList[1].getComponent(Toggle);
          toggleComponent.isChecked = true;
          debugView.lightingWithAlbedo = true;
        };

        _proto.hideUI = function hideUI(button) {
          var titleNode = this.node.getChildByName('Titles');
          var activeValue = !titleNode.active;
          this.singleModeToggleList[0].parent.active = activeValue;
          this.miscModeToggleList[0].parent.active = activeValue;
          this.compositeModeToggleList[0].parent.active = activeValue;
          this.EnableAllCompositeModeButton.parent.active = activeValue;
          titleNode.active = activeValue;
          this.hideButtonLabel.string = activeValue ? 'Hide UI' : 'Show UI';
        };

        _proto.changeTextColor = function changeTextColor(button) {
          this._currentColorIndex++;

          if (this._currentColorIndex >= this.strColor.length) {
            this._currentColorIndex = 0;
          }

          for (var i = 0; i < this.textComponentList.length; i++) {
            this.textComponentList[i].string = this.strColor[this._currentColorIndex] + this.textContentList[i] + '</color>';
          }

          for (var _i4 = 0; _i4 < this.labelComponentList.length; _i4++) {
            this.labelComponentList[_i4].color = this.color[this._currentColorIndex];
          }
        };

        _proto.onLoad = function onLoad() {};

        _proto.update = function update(deltaTime) {};

        return DebugViewRuntimeControl;
      }(Component), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "compositeModeToggle", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "singleModeToggle", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "EnableAllCompositeModeButton", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      })), _class2)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/FillingStage.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  var _createClass, cclegacy;

  return {
    setters: [function (module) {
      _createClass = module.createClass;
    }, function (module) {
      cclegacy = module.cclegacy;
    }],
    execute: function () {
      cclegacy._RF.push({}, "bf912FwLvFOdKSHBOELcco6", "FillingStage", undefined);

      var FillingStage = exports('FillingStage', /*#__PURE__*/function () {
        function FillingStage(boardFill) {
          this._boardFill = void 0;
          this._isStarted = false;
          this._isDone = false;
          this._boardFill = boardFill;
        }

        var _proto = FillingStage.prototype;

        _proto.reset = function reset() {
          this._isStarted = false;
          this._isDone = false;
        };

        _proto.execute = function execute() {
          console.log("FillingStage execute");
          this._isStarted = true;

          this._boardFill.fill();

          this._isDone = true;
        };

        _createClass(FillingStage, [{
          key: "isStarted",
          get: function get() {
            return this._isStarted;
          }
        }, {
          key: "isDone",
          get: function get() {
            return this._isDone;
          }
        }]);

        return FillingStage;
      }());

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/GameController.ts", ['cc', './ActionPerformer.ts', './Binder.ts', './Board.ts', './BoardStats.ts', './ColorPalette.ts', './ISetState.ts', './SceneSwitcher.ts', './AllowActionStage.ts', './FillingStage.ts', './IfLostStage.ts', './IfWinStage.ts', './ShiftDownAndFillStage.ts', './ShuffleIfCantContinueStage.ts', './StageController.ts', './WaitForActionStage.ts', './WaitForTimeStage.ts'], function (exports) {
  var cclegacy, ActionPerformer, Binder, Board, BoardStats, ColorPalette, GameState, SceneSwitcher, AllowActionStage, FillingStage, IfLostStage, IfWinStage, ShiftDownAndFillStage, ShuffleIfCantContinueStage, StageController, WaitForActionStage, WaitForTimeStage;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      ActionPerformer = module.ActionPerformer;
    }, function (module) {
      Binder = module.Binder;
    }, function (module) {
      Board = module.Board;
    }, function (module) {
      BoardStats = module.BoardStats;
    }, function (module) {
      ColorPalette = module.ColorPalette;
    }, function (module) {
      GameState = module.GameState;
    }, function (module) {
      SceneSwitcher = module.SceneSwitcher;
    }, function (module) {
      AllowActionStage = module.AllowActionStage;
    }, function (module) {
      FillingStage = module.FillingStage;
    }, function (module) {
      IfLostStage = module.IfLostStage;
    }, function (module) {
      IfWinStage = module.IfWinStage;
    }, function (module) {
      ShiftDownAndFillStage = module.ShiftDownAndFillStage;
    }, function (module) {
      ShuffleIfCantContinueStage = module.ShuffleIfCantContinueStage;
    }, function (module) {
      StageController = module.StageController;
    }, function (module) {
      WaitForActionStage = module.WaitForActionStage;
    }, function (module) {
      WaitForTimeStage = module.WaitForTimeStage;
    }],
    execute: function () {
      cclegacy._RF.push({}, "32ce3Fy2mdHca6vgsgqyDaU", "GameController", undefined);

      var GameController = exports('GameController', /*#__PURE__*/function () {
        function GameController(settings) {
          this._state = void 0;
          this._settings = void 0;
          this._colorPalette = void 0;
          this._board = void 0;
          this._boardStats = void 0;
          this._actionPerformer = void 0;
          this._sceneSwitcher = void 0;
          this._stageController = void 0;
          this._settings = settings;
          this._state = GameState.None;
        }

        var _proto = GameController.prototype;

        _proto.setStateTo = function setStateTo(state) {
          var _this = this;

          switch (state) {
            case GameState.Start:
              if (this._state === GameState.None || this._state === GameState.GameOver) {
                console.log("Game Init");
                this._state = state;
                this.init();
                this.setStateTo(GameState.Playing);
              }

              break;

            case GameState.Playing:
              if (this._state === GameState.Start) {
                this._state = state;
                console.log("Game Start");

                this._sceneSwitcher.switchScene(this._settings.gameScreenName, function () {
                  console.log("GameScreen loaded");

                  _this._stageController.startSequance();
                });
              }

              break;

            case GameState.Paused:
              break;

            case GameState.GameOver:
              if (this._state === GameState.Playing) {
                this._state = state;
                console.log("Game Over");

                this._sceneSwitcher.switchScene(this._settings.gameOverScreenName, function () {
                  console.log("GameOverScreen loaded");
                });
              }

              break;
          }
        };

        _proto.update = function update() {
          if (this._state === GameState.Playing && this._stageController.isStarted) {
            this._stageController.update();
          }
        };

        _proto.init = function init() {
          var _this2 = this;

          this.clear();
          this._colorPalette = new ColorPalette(this._settings.tileColors);
          this._board = new Board(this._settings.boardMaxX, this._settings.boardMaxY, this._colorPalette);
          this._boardStats = new BoardStats(this._settings.maxTurns, this._settings.targetScore, this._settings.maxShuffleCount);
          this._actionPerformer = new ActionPerformer(this._board, this._boardStats, this._settings.groupSizeForDefaultAction);
          this._sceneSwitcher = new SceneSwitcher(this._settings.loadingScreenName);
          this._stageController = new StageController();

          this._stageController.onEndGameSequence = function () {
            _this2.setStateTo(GameState.GameOver);
          };

          this.addStages();
          this.makeBindings();
        };

        _proto.clear = function clear() {
          // On second reloading of the game, ewrything is already inited
          // and 'new ()' doesn't work. It seems that typescript works this way.
          // So we need to clear it first
          this._colorPalette = null;
          this._colorPalette = null;
          this._board = null;
          this._boardStats = null;
          this._actionPerformer = null;
          this._sceneSwitcher = null;
          this._stageController = null;
          Binder.getInstance().clear();
        };

        _proto.makeBindings = function makeBindings() {
          Binder.getInstance().addBinding("IReadStatsAndAddObserver", this._boardStats);
          Binder.getInstance().addBinding("IBoardDataAndAddNotifier", this._board);
          Binder.getInstance().addBinding("ISetAndPerformeAction", this._actionPerformer);
          Binder.getInstance().addBinding("ISetAction", this._actionPerformer);
          Binder.getInstance().addBinding("ISetAddActionObserverGetCount", this._actionPerformer);
          Binder.getInstance().addBinding("ISetState", this);
        };

        _proto.addStages = function addStages() {
          var startStages = [new WaitForTimeStage(1), new AllowActionStage(false, this._actionPerformer), new FillingStage(this._board), new WaitForTimeStage(1)];
          var repeatingStages = [new IfWinStage(this._boardStats, this._stageController), new IfLostStage(this._boardStats, this._stageController), new ShuffleIfCantContinueStage(1, this._actionPerformer, this._board, this._boardStats, this._stageController), new AllowActionStage(true, this._actionPerformer), new WaitForActionStage(this._actionPerformer, this._actionPerformer), new AllowActionStage(false, this._actionPerformer), new ShiftDownAndFillStage(this._board, this._board), new WaitForTimeStage(1)];

          this._stageController.addStartStages(startStages);

          this._stageController.addRepeatingStages(repeatingStages);
        };

        return GameController;
      }());

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/GameSettings.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, CCString, CCInteger, Color, Component;

  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      CCString = module.CCString;
      CCInteger = module.CCInteger;
      Color = module.Color;
      Component = module.Component;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _dec11, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _descriptor9, _descriptor10;

      cclegacy._RF.push({}, "f060aDmR5JCMahVVwa/kpNj", "GameSettings", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;
      var GameSettings = exports('GameSettings', (_dec = ccclass('GameSettings'), _dec2 = property(CCString), _dec3 = property(CCString), _dec4 = property(CCString), _dec5 = property(CCInteger), _dec6 = property(CCInteger), _dec7 = property([Color]), _dec8 = property(CCInteger), _dec9 = property(CCInteger), _dec10 = property(CCInteger), _dec11 = property(CCInteger), _dec(_class = (_class2 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(GameSettings, _Component);

        function GameSettings() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;

          _initializerDefineProperty(_this, "loadingScreenName", _descriptor, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "gameScreenName", _descriptor2, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "gameOverScreenName", _descriptor3, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "boardMaxX", _descriptor4, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "boardMaxY", _descriptor5, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "tileColors", _descriptor6, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "groupSizeForDefaultAction", _descriptor7, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "maxShuffleCount", _descriptor8, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "maxTurns", _descriptor9, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "targetScore", _descriptor10, _assertThisInitialized(_this));

          return _this;
        }

        return GameSettings;
      }(Component), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "loadingScreenName", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "gameScreenName", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "gameOverScreenName", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "boardMaxX", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 5;
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "boardMaxY", [_dec6], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 5;
        }
      }), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "tileColors", [_dec7], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return [];
        }
      }), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "groupSizeForDefaultAction", [_dec8], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 2;
        }
      }), _descriptor8 = _applyDecoratedDescriptor(_class2.prototype, "maxShuffleCount", [_dec9], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 2;
        }
      }), _descriptor9 = _applyDecoratedDescriptor(_class2.prototype, "maxTurns", [_dec10], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 10;
        }
      }), _descriptor10 = _applyDecoratedDescriptor(_class2.prototype, "targetScore", [_dec11], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 100;
        }
      })), _class2)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/IAction.ts", ['cc'], function () {
  var cclegacy;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }],
    execute: function () {
      cclegacy._RF.push({}, "2a77e3c8AVP+4VIjedXkF13", "IAction", undefined);

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/IActionResult.ts", ['cc'], function () {
  var cclegacy;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }],
    execute: function () {
      cclegacy._RF.push({}, "6ac4azpKCdJ1Zlp7zcJjxCg", "IActionResult", undefined);

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/IAddActionGetCount.ts", ['cc'], function () {
  var cclegacy;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }],
    execute: function () {
      cclegacy._RF.push({}, "61d1dOl6QNOZZQimUkxxAg8", "IAddActionGetCount", undefined);

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/IAddObserver.ts", ['cc'], function () {
  var cclegacy;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }],
    execute: function () {
      cclegacy._RF.push({}, "c6282ozcc5Mp4V0SAGLft3C", "IAddObserver", undefined);

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/IAllowAction.ts", ['cc'], function () {
  var cclegacy;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }],
    execute: function () {
      cclegacy._RF.push({}, "cbe3eKdrYlJSpxvGrlC4OQL", "IAllowAction", undefined);

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/IBoard.ts", ['cc'], function () {
  var cclegacy;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }],
    execute: function () {
      cclegacy._RF.push({}, "ad787PzQmJFdpf5P0G89XGh", "IBoard", undefined);

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/IBoardDataAndAddNotifier.ts", ['cc'], function () {
  var cclegacy;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }],
    execute: function () {
      cclegacy._RF.push({}, "8ec9cwZ8NhDZ4lr0Mt/yf1N", "IBoardDataAndAddNotifier", undefined);

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/IBoardLastChanged.ts", ['cc'], function (exports) {
  var cclegacy;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }],
    execute: function () {
      cclegacy._RF.push({}, "b00c4APGAdFw59IZHL0mKCK", "IBoardLastChanged", undefined);

      var TilesChange = exports('TilesChange', /*#__PURE__*/function (TilesChange) {
        TilesChange[TilesChange["Added"] = 0] = "Added";
        TilesChange[TilesChange["Removed"] = 1] = "Removed";
        TilesChange[TilesChange["Moved"] = 2] = "Moved";
        return TilesChange;
      }({}));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/IBoardReadData.ts", ['cc'], function () {
  var cclegacy;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }],
    execute: function () {
      cclegacy._RF.push({}, "24c785BmWpA7phDzcbOVpPU", "IBoardReadData", undefined);

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/ICanDoDefaultAction.ts", ['cc'], function () {
  var cclegacy;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }],
    execute: function () {
      cclegacy._RF.push({}, "5b56dV5Bb1Ng4SUETZ83m/R", "ICanDoDefaultAction", undefined);

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/ICanShuffle.ts", ['cc'], function () {
  var cclegacy;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }],
    execute: function () {
      cclegacy._RF.push({}, "902a8huSBpNXr3qjztMEE4v", "ICanShuffle", undefined);

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/ICanShuffleAndIncrease.ts", ['cc'], function () {
  var cclegacy;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }],
    execute: function () {
      cclegacy._RF.push({}, "d1a76/kJ2FNe6u4f/BnQQrU", "ICanShuffleAndIncrease", undefined);

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/ICheckLost.ts", ['cc'], function () {
  var cclegacy;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }],
    execute: function () {
      cclegacy._RF.push({}, "6be727DrOpJyYAErgvPSLR/", "ICheckLost", undefined);

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/ICheckWin.ts", ['cc'], function () {
  var cclegacy;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }],
    execute: function () {
      cclegacy._RF.push({}, "d1502HJZnJHA6tDFiwUNmMl", "ICheckWin", undefined);

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/IColorPalette.ts", ['cc'], function () {
  var cclegacy;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }],
    execute: function () {
      cclegacy._RF.push({}, "6149fYdtG9OkacFzkX4+FrV", "IColorPalette", undefined); // import { Color } from 'cc';


      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/IEndGameSequence.ts", ['cc'], function () {
  var cclegacy;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }],
    execute: function () {
      cclegacy._RF.push({}, "7b892ABlR1OAJ4JVruLq309", "IEndGameSequence", undefined);

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/IFillBoard.ts", ['cc'], function () {
  var cclegacy;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }],
    execute: function () {
      cclegacy._RF.push({}, "52ae29Q8GBNVpyBKMLDGC2+", "IFillBoard", undefined);

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/IfLostStage.ts", ['cc'], function (exports) {
  var cclegacy;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }],
    execute: function () {
      cclegacy._RF.push({}, "8bb06SxzARAoLboDLblxC+W", "IfLostStage", undefined);

      var IfLostStage = exports('IfLostStage', /*#__PURE__*/function () {
        function IfLostStage(endGameChecker, endGameSequence) {
          this._endGameChecker = void 0;
          this._endGameSequence = void 0;
          this.isStarted = void 0;
          this.isDone = void 0;
          this._endGameChecker = endGameChecker;
          this._endGameSequence = endGameSequence;
        }

        var _proto = IfLostStage.prototype;

        _proto.reset = function reset() {
          this.isStarted = false;
          this.isDone = false;
        };

        _proto.execute = function execute() {
          console.log("IfLostStage execute");
          this.isStarted = true;

          if (this._endGameChecker.ifLost) {
            this._endGameSequence.endSequance();
          }

          this.isDone = true;
        };

        return IfLostStage;
      }());

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/IfWinStage.ts", ['cc'], function (exports) {
  var cclegacy;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }],
    execute: function () {
      cclegacy._RF.push({}, "7a5c1krz3NBDJWZ/sZjc9Ol", "IfWinStage", undefined);

      var IfWinStage = exports('IfWinStage', /*#__PURE__*/function () {
        function IfWinStage(winChecker, endGameSequence) {
          this._winChecker = void 0;
          this._endGameSequence = void 0;
          this.isStarted = void 0;
          this.isDone = void 0;
          this._winChecker = winChecker;
          this._endGameSequence = endGameSequence;
        }

        var _proto = IfWinStage.prototype;

        _proto.reset = function reset() {
          this.isStarted = false;
          this.isDone = false;
        };

        _proto.execute = function execute() {
          console.log("IfWinStage execute");
          this.isStarted = true;

          if (this._winChecker.ifWin) {
            this._endGameSequence.endSequance();
          }

          this.isDone = true;
        };

        return IfWinStage;
      }());

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/IGameController.ts", ['cc'], function () {
  var cclegacy;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }],
    execute: function () {
      cclegacy._RF.push({}, "889b3tGKklAEJWjy+qiA2Ur", "IGameController", undefined);

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/IGameSettings.ts", ['cc'], function () {
  var cclegacy;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }],
    execute: function () {
      cclegacy._RF.push({}, "3d1faF/Wg5DOqc6sME4rSxq", "IGameSettings", undefined);

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/IIncreaseShuffle.ts", ['cc'], function () {
  var cclegacy;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }],
    execute: function () {
      cclegacy._RF.push({}, "469f1pwrbtASbbO07L+P6CQ", "IIncreaseShuffle", undefined);

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/IIsActionAllowed.ts", ['cc'], function () {
  var cclegacy;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }],
    execute: function () {
      cclegacy._RF.push({}, "364b9r5rEZE87j5yJy4cblA", "IIsActionAllowed", undefined);

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/IObserver.ts", ['cc'], function () {
  var cclegacy;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }],
    execute: function () {
      cclegacy._RF.push({}, "e1c5970tNdAs5yWcgAdyKMF", "IObserver", undefined);

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/IOnEndGameSequence.ts", ['cc'], function () {
  var cclegacy;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }],
    execute: function () {
      cclegacy._RF.push({}, "deb72jBB+9I4JoJ/TQnLhpI", "IOnEndGameSequence", undefined);

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/IReadStats.ts", ['cc'], function () {
  var cclegacy;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }],
    execute: function () {
      cclegacy._RF.push({}, "f5fb3cHFpxNl4DWzxyondP4", "IReadStats", undefined);

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/IReadStatsAndAddObserver.ts", ['cc'], function () {
  var cclegacy;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }],
    execute: function () {
      cclegacy._RF.push({}, "6db504g4VhFIrFDxWIYEK+M", "IReadStatsAndAddObserver", undefined);

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/IReadTile.ts", ['cc'], function () {
  var cclegacy;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }],
    execute: function () {
      cclegacy._RF.push({}, "aa4caMcgKNGoJNec1M8rkSx", "IReadTile", undefined);

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/IReturn.ts", ['cc'], function () {
  var cclegacy;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }],
    execute: function () {
      cclegacy._RF.push({}, "3819bKmX3lHCrnhnF+y/lLm", "IReturn", undefined);

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/ISceneSwitcher.ts", ['cc'], function () {
  var cclegacy;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }],
    execute: function () {
      cclegacy._RF.push({}, "3c8aa4mQlRHDLdVLxgBW9F9", "ISceneSwitcher", undefined);

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/ISetAction.ts", ['cc'], function () {
  var cclegacy;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }],
    execute: function () {
      cclegacy._RF.push({}, "cdd2d/rRFBGgaqrFoe3Dpua", "ISetAction", undefined);

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/ISetAddActionObserverGetCount.ts", ['cc'], function () {
  var cclegacy;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }],
    execute: function () {
      cclegacy._RF.push({}, "ae760Ye/lZGnqGk/X9DH5T0", "ISetAddActionObserverGetCount", undefined);

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/ISetAndPerformeAction.ts", ['cc'], function () {
  var cclegacy;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }],
    execute: function () {
      cclegacy._RF.push({}, "6839cUHU31ER7hgCgeSQilE", "ISetAndPerformeAction", undefined);

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/ISetState.ts", ['cc'], function (exports) {
  var cclegacy;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }],
    execute: function () {
      cclegacy._RF.push({}, "83004zvVVhMa5ZWMT2UdHr4", "ISetState", undefined);

      var GameState = exports('GameState', /*#__PURE__*/function (GameState) {
        GameState[GameState["None"] = 0] = "None";
        GameState[GameState["Start"] = 1] = "Start";
        GameState[GameState["Playing"] = 2] = "Playing";
        GameState[GameState["Paused"] = 3] = "Paused";
        GameState[GameState["GameOver"] = 4] = "GameOver";
        return GameState;
      }({}));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/IShiftDownBoard.ts", ['cc'], function () {
  var cclegacy;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }],
    execute: function () {
      cclegacy._RF.push({}, "bc6d5WZQp9I0prMKhPLJgW3", "IShiftDownBoard", undefined);

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/IShuffle.ts", ['cc'], function () {
  var cclegacy;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }],
    execute: function () {
      cclegacy._RF.push({}, "37f0b5O2AFLbbbuA2BLnp0s", "IShuffle", undefined);

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/IStage.ts", ['cc'], function () {
  var cclegacy;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }],
    execute: function () {
      cclegacy._RF.push({}, "d8614xoV7FNpL8XVb9IPuZy", "IStage", undefined);

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/IStageController.ts", ['cc'], function () {
  var cclegacy;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }],
    execute: function () {
      cclegacy._RF.push({}, "56681Vhc2FGbr2s2t6u5R41", "IStageController", undefined);

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/IStartGameSequenceAndUpdate.ts", ['cc'], function () {
  var cclegacy;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }],
    execute: function () {
      cclegacy._RF.push({}, "5618aVUhbhElL0+moebUyYx", "IStartGameSequenceAndUpdate", undefined);

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/ITile.ts", ['cc'], function () {
  var cclegacy;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }],
    execute: function () {
      cclegacy._RF.push({}, "88ec9uSPFFKuZ2egBSED+aB", "ITile", undefined);

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/ITileSetPosition.ts", ['cc'], function () {
  var cclegacy;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }],
    execute: function () {
      cclegacy._RF.push({}, "aa49bX+9nlMc6cArnxHaAEu", "ITileSetPosition", undefined);

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/main", ['./debug-view-runtime-control.ts', './ActionBomb.ts', './ActionPerformer.ts', './ActionRemoveBatchSameColor.ts', './ActionResult.ts', './IAction.ts', './IActionResult.ts', './IAddActionGetCount.ts', './ISetAction.ts', './ISetAddActionObserverGetCount.ts', './ISetAndPerformeAction.ts', './Binder.ts', './Board.ts', './BoardStats.ts', './IAddObserver.ts', './IAllowAction.ts', './IBoard.ts', './IBoardDataAndAddNotifier.ts', './IBoardLastChanged.ts', './IBoardReadData.ts', './ICanDoDefaultAction.ts', './ICanShuffle.ts', './ICanShuffleAndIncrease.ts', './ICheckLost.ts', './ICheckWin.ts', './IFillBoard.ts', './IIncreaseShuffle.ts', './IIsActionAllowed.ts', './IObserver.ts', './IReadStats.ts', './IReadStatsAndAddObserver.ts', './IReadTile.ts', './IShiftDownBoard.ts', './IShuffle.ts', './ITile.ts', './ITileSetPosition.ts', './Tile.ts', './ColorPalette.ts', './IColorPalette.ts', './GameController.ts', './IGameController.ts', './ISetState.ts', './ISceneSwitcher.ts', './SceneSwitcher.ts', './AllowActionStage.ts', './FillingStage.ts', './IEndGameSequence.ts', './IOnEndGameSequence.ts', './IStage.ts', './IStageController.ts', './IStartGameSequenceAndUpdate.ts', './IfLostStage.ts', './IfWinStage.ts', './ShiftDownAndFillStage.ts', './ShuffleIfCantContinueStage.ts', './StageController.ts', './WaitForActionStage.ts', './WaitForTimeStage.ts', './GameSettings.ts', './IGameSettings.ts', './Main.ts', './BoardComponent.ts', './BombBoosterComponent.ts', './BonusComponent.ts', './IReturn.ts', './ObjectPool.ts', './PooledObject.ts', './PlayButtonComponent.ts', './ProgressComponent.ts', './ScoreComponent.ts', './ShuffleComponent.ts', './TileComponent.ts', './TurnsComponent.ts'], function () {
  return {
    setters: [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
    execute: function () {}
  };
});

System.register("chunks:///_virtual/Main.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './GameController.ts', './GameSettings.ts', './ISetState.ts'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, director, Component, GameController, GameSettings, GameState;

  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      director = module.director;
      Component = module.Component;
    }, function (module) {
      GameController = module.GameController;
    }, function (module) {
      GameSettings = module.GameSettings;
    }, function (module) {
      GameState = module.GameState;
    }],
    execute: function () {
      var _dec, _dec2, _class, _class2, _descriptor;

      cclegacy._RF.push({}, "27cc4XqKvxJF4DqUQvPRBaP", "Main", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;
      var Main = exports('Main', (_dec = ccclass('Main'), _dec2 = property(GameSettings), _dec(_class = (_class2 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(Main, _Component);

        function Main() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;

          _initializerDefineProperty(_this, "gameSettings", _descriptor, _assertThisInitialized(_this));

          _this._gameController = void 0;
          return _this;
        }

        var _proto = Main.prototype;

        _proto.onLoad = function onLoad() {
          console.log("Main onLoad");
          director.addPersistRootNode(this.node);
          this._gameController = new GameController(this.gameSettings);
        };

        _proto.start = function start() {
          console.log("Main start");

          this._gameController.setStateTo(GameState.Start);
        };

        _proto.update = function update() {
          this._gameController.update();
        };

        return Main;
      }(Component), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "gameSettings", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _class2)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/ObjectPool.ts", ['cc', './PooledObject.ts'], function (exports) {
  var cclegacy, PooledObject;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      PooledObject = module.PooledObject;
    }],
    execute: function () {
      cclegacy._RF.push({}, "dca44ME1tlEwIK4p/yU4zGc", "ObjectPool", undefined);

      var ObjectPool = exports('ObjectPool', /*#__PURE__*/function () {
        function ObjectPool(prefab, parent, defaultPoolCount, componentName) {
          this.prefab = void 0;
          this.parent = void 0;
          this.pooledObjects = [];
          this.componentName = void 0;
          this.prefab = prefab;
          this.parent = parent;
          this.componentName = componentName;

          for (var i = 0; i < defaultPoolCount; i++) {
            this.createNew();
          }
        }

        var _proto = ObjectPool.prototype;

        _proto.borrow = function borrow() {
          var objectToBorrow = this.pooledObjects.find(function (o) {
            return !o.IsBorrowed;
          });

          if (objectToBorrow != null) {
            return objectToBorrow.borrow();
          }

          return this.createNew().borrow();
        };

        _proto["return"] = function _return(object) {
          var objectToReturn = this.pooledObjects.find(function (o) {
            return o.Equals(object);
          });

          if (objectToReturn == null) {
            throw new Error("Object " + this.prefab.name + " is not a member of the pool");
          }

          objectToReturn["return"]();
        };

        _proto.createNew = function createNew() {
          var newPooledObject = new PooledObject(this.prefab, this.parent, this.componentName);
          this.pooledObjects.push(newPooledObject);
          return newPooledObject;
        };

        return ObjectPool;
      }());

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/PlayButtonComponent.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './Binder.ts', './ISetState.ts'], function (exports) {
  var _inheritsLoose, cclegacy, _decorator, Component, Binder, GameState;

  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Component = module.Component;
    }, function (module) {
      Binder = module.Binder;
    }, function (module) {
      GameState = module.GameState;
    }],
    execute: function () {
      var _dec, _class;

      cclegacy._RF.push({}, "11e44x0e2ZCwILWJL5R8Fav", "PlayButtonComponent", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;
      var PlayButtonComponent = exports('PlayButtonComponent', (_dec = ccclass('PlayButtonComponent'), _dec(_class = /*#__PURE__*/function (_Component) {
        _inheritsLoose(PlayButtonComponent, _Component);

        function PlayButtonComponent() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;
          _this._setState = void 0;
          return _this;
        }

        var _proto = PlayButtonComponent.prototype;

        _proto.onLoad = function onLoad() {
          var binder = Binder.getInstance();
          this._setState = binder.resolve("ISetState");
        };

        _proto.setGameStateToPlay = function setGameStateToPlay() {
          this._setState.setStateTo(GameState.Start);
        };

        return PlayButtonComponent;
      }(Component)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/PooledObject.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  var _createClass, cclegacy, instantiate;

  return {
    setters: [function (module) {
      _createClass = module.createClass;
    }, function (module) {
      cclegacy = module.cclegacy;
      instantiate = module.instantiate;
    }],
    execute: function () {
      cclegacy._RF.push({}, "413c7pxyzBDgInpPEVtC+7J", "PooledObject", undefined);

      var PooledObject = exports('PooledObject', /*#__PURE__*/function () {
        function PooledObject(prefab, defaultParent, componentName) {
          this.isBorrowed = false;
          this.defaultParent = void 0;
          this.instancedNode = void 0;
          this.instancedComponent = void 0;
          this.defaultParent = defaultParent;
          this.instancedNode = instantiate(prefab);
          this.instancedComponent = this.instancedNode.getComponent(componentName);

          if (this.instancedComponent == null) {
            console.error("Object " + prefab.name + " does not have component " + componentName);
          }

          this.clear();
        }

        var _proto = PooledObject.prototype;

        _proto.Equals = function Equals(component) {
          return this.instancedComponent == component;
        };

        _proto.borrow = function borrow() {
          this.isBorrowed = true;
          return this.instancedComponent;
        };

        _proto["return"] = function _return() {
          this.clear();
        };

        _proto.clear = function clear() {
          this.instancedNode.active = false;
          this.instancedNode.parent = this.defaultParent;
          this.isBorrowed = false;
        };

        _createClass(PooledObject, [{
          key: "IsBorrowed",
          get: function get() {
            return this.isBorrowed;
          }
        }]);

        return PooledObject;
      }());

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/ProgressComponent.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './Binder.ts'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, ProgressBar, Component, Binder;

  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      ProgressBar = module.ProgressBar;
      Component = module.Component;
    }, function (module) {
      Binder = module.Binder;
    }],
    execute: function () {
      var _dec, _dec2, _class, _class2, _descriptor;

      cclegacy._RF.push({}, "24033/qI8ZP1Iiz+Dkyfbxe", "ProgressComponent", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;
      var ProgressComponent = exports('ProgressComponent', (_dec = ccclass('ProgressComponent'), _dec2 = property(ProgressBar), _dec(_class = (_class2 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(ProgressComponent, _Component);

        function ProgressComponent() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;

          _initializerDefineProperty(_this, "progress", _descriptor, _assertThisInitialized(_this));

          _this._stats = void 0;
          return _this;
        }

        var _proto = ProgressComponent.prototype;

        _proto.onLoad = function onLoad() {
          if (!this.progress) {
            throw new Error('progress is null');
          }

          var binder = Binder.getInstance();
          this._stats = binder.resolve("IReadStatsAndAddObserver");

          this._stats.addObserver(this);
        };

        _proto.notified = function notified() {
          this.progress.progress = this._stats.currentScore / this._stats.targetScore;
        };

        return ProgressComponent;
      }(Component), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "progress", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _class2)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/SceneSwitcher.ts", ['cc'], function (exports) {
  var cclegacy, director;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
      director = module.director;
    }],
    execute: function () {
      cclegacy._RF.push({}, "0ee51zYLv1Bi4FSBdTFzMw1", "SceneSwitcher", undefined);

      var SceneSwitcher = exports('SceneSwitcher', /*#__PURE__*/function () {
        function SceneSwitcher(loadingScreenName) {
          this._loadingScreenName = void 0;
          this._loadingScreenName = loadingScreenName;
        }

        var _proto = SceneSwitcher.prototype;

        _proto.switchScene = function switchScene(sceneName, callback) {
          if (callback === void 0) {
            callback = function callback() {};
          }

          this.loadLoadingScreen(function () {
            director.loadScene(sceneName, function (err, scene) {
              if (err) {
                console.error(err);
                return;
              }

              callback == null ? void 0 : callback();
            });
          });
        };

        _proto.loadLoadingScreen = function loadLoadingScreen(callback) {
          if (callback === void 0) {
            callback = function callback() {};
          }

          director.loadScene(this._loadingScreenName, function (err, scene) {
            if (err) {
              console.error(err);
              return;
            }

            callback == null ? void 0 : callback();
          });
        };

        return SceneSwitcher;
      }());

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/ScoreComponent.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './Binder.ts'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, Label, Component, Binder;

  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Label = module.Label;
      Component = module.Component;
    }, function (module) {
      Binder = module.Binder;
    }],
    execute: function () {
      var _dec, _dec2, _class, _class2, _descriptor;

      cclegacy._RF.push({}, "0aa04M+3PpE6YX2igW5yntk", "ScoreComponent", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;
      var ScoreComponent = exports('ScoreComponent', (_dec = ccclass('ScoreComponent'), _dec2 = property(Label), _dec(_class = (_class2 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(ScoreComponent, _Component);

        function ScoreComponent() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;

          _initializerDefineProperty(_this, "score", _descriptor, _assertThisInitialized(_this));

          _this._stats = void 0;
          return _this;
        }

        var _proto = ScoreComponent.prototype;

        _proto.onLoad = function onLoad() {
          if (!this.score) {
            throw new Error('score is null');
          }

          var binder = Binder.getInstance();
          this._stats = binder.resolve("IReadStatsAndAddObserver");

          this._stats.addObserver(this);
        };

        _proto.notified = function notified() {
          this.score.string = this._stats.currentScore.toString();
        };

        return ScoreComponent;
      }(Component), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "score", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _class2)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/ShiftDownAndFillStage.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  var _createClass, cclegacy;

  return {
    setters: [function (module) {
      _createClass = module.createClass;
    }, function (module) {
      cclegacy = module.cclegacy;
    }],
    execute: function () {
      cclegacy._RF.push({}, "92707p9modLl7AyV66tTi3p", "ShiftDownAndFillStage", undefined);

      var ShiftDownAndFillStage = exports('ShiftDownAndFillStage', /*#__PURE__*/function () {
        function ShiftDownAndFillStage(boardShiftDown, boardFill) {
          this._boardFill = void 0;
          this._isStarted = false;
          this._isDone = false;
          this._boardShiftDown = void 0;
          this._boardShiftDown = boardShiftDown;
          this._boardFill = boardFill;
        }

        var _proto = ShiftDownAndFillStage.prototype;

        _proto.reset = function reset() {
          this._isStarted = false;
          this._isDone = false;
        };

        _proto.execute = function execute() {
          console.log("ShiftDownAndFillStage execute");
          this._isStarted = true;

          this._boardShiftDown.shiftDown();

          this._boardFill.fill();

          this._isDone = true;
        };

        _createClass(ShiftDownAndFillStage, [{
          key: "isStarted",
          get: function get() {
            return this._isStarted;
          }
        }, {
          key: "isDone",
          get: function get() {
            return this._isDone;
          }
        }]);

        return ShiftDownAndFillStage;
      }());

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/ShuffleComponent.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './Binder.ts'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, Label, Component, Binder;

  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Label = module.Label;
      Component = module.Component;
    }, function (module) {
      Binder = module.Binder;
    }],
    execute: function () {
      var _dec, _dec2, _class, _class2, _descriptor;

      cclegacy._RF.push({}, "b0988y+uDJAlpOfk0RZeoD9", "ShuffleComponent", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;
      var ShuffleComponent = exports('ShuffleComponent', (_dec = ccclass('ShuffleComponent'), _dec2 = property(Label), _dec(_class = (_class2 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(ShuffleComponent, _Component);

        function ShuffleComponent() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;

          _initializerDefineProperty(_this, "shuffles", _descriptor, _assertThisInitialized(_this));

          _this._stats = void 0;
          return _this;
        }

        var _proto = ShuffleComponent.prototype;

        _proto.onLoad = function onLoad() {
          if (!this.shuffles) {
            throw new Error('shuffles is null');
          }

          var binder = Binder.getInstance();
          this._stats = binder.resolve("IReadStatsAndAddObserver");

          this._stats.addObserver(this);
        };

        _proto.notified = function notified() {
          this.shuffles.string = (this._stats.maxShuffleCount - this._stats.currentShuffleCount).toString();
        };

        return ShuffleComponent;
      }(Component), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "shuffles", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _class2)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/ShuffleIfCantContinueStage.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  var _createClass, cclegacy;

  return {
    setters: [function (module) {
      _createClass = module.createClass;
    }, function (module) {
      cclegacy = module.cclegacy;
    }],
    execute: function () {
      cclegacy._RF.push({}, "c52d6OMxMpE0Jatke5AvFKw", "ShuffleIfCantContinueStage", undefined);

      var ShuffleIfCantContinueStage = exports('ShuffleIfCantContinueStage', /*#__PURE__*/function () {
        function ShuffleIfCantContinueStage(time, canContinue, shuffle, canShuffleAndIncrease, endGameSequence) {
          this._canContinue = void 0;
          this._shuffle = void 0;
          this._canShuffleAndIncrease = void 0;
          this._endGameSequence = void 0;
          this._time = void 0;
          this._isStarted = false;
          this._isDone = false;
          this._time = time;
          this._canContinue = canContinue;
          this._shuffle = shuffle;
          this._canShuffleAndIncrease = canShuffleAndIncrease;
          this._endGameSequence = endGameSequence;
        }

        var _proto = ShuffleIfCantContinueStage.prototype;

        _proto.reset = function reset() {
          this._isStarted = false;
          this._isDone = false;
        };

        _proto.execute = function execute() {
          var _this = this;

          console.log("ShuffleIfCantContinueStage execute");
          this._isStarted = true;

          if (!this._canContinue.canDoDefaultAction) {
            if (this._canShuffleAndIncrease.canShuffle) {
              this._shuffle.shuffle();

              this._canShuffleAndIncrease.increaseShuffle();

              setTimeout(function () {
                _this.execute();
              }, this._time * 1000);
            } else {
              this._endGameSequence.endSequance();

              this._isDone = true;
            }
          } else {
            this._isDone = true;
          }
        };

        _createClass(ShuffleIfCantContinueStage, [{
          key: "isStarted",
          get: function get() {
            return this._isStarted;
          }
        }, {
          key: "isDone",
          get: function get() {
            return this._isDone;
          }
        }]);

        return ShuffleIfCantContinueStage;
      }());

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/StageController.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  var _createClass, cclegacy;

  return {
    setters: [function (module) {
      _createClass = module.createClass;
    }, function (module) {
      cclegacy = module.cclegacy;
    }],
    execute: function () {
      cclegacy._RF.push({}, "ea256BZt71FNZzm26uexlW3", "StageController", undefined);

      var StageController = exports('StageController', /*#__PURE__*/function () {
        function StageController() {
          this._currentStageIndex = void 0;
          this._repeatingStages = [];
          this._startStages = [];
          this._endStages = [];
          this._stageType = void 0;
          this._sequenceEnded = void 0;
          this.onEndGameSequence = void 0;
          this._stageType = StageType.None;
          this._sequenceEnded = false;
          this._currentStageIndex = 0;
        }

        var _proto = StageController.prototype;

        _proto.update = function update() {
          if (this._sequenceEnded) {
            return;
          }

          var currentStages = this.getStages(this._stageType);

          if (this._currentStageIndex < currentStages.length) {
            var currentStage = currentStages[this._currentStageIndex];

            if (currentStage.isDone) {
              this.increaseStageCounter();
              currentStage.reset();
            } else if (currentStage.isStarted) {
              return;
            } else {
              console.log("StageController update execute");
              currentStage.execute();
            }
          } else {
            this.switchToNextStage();
          }
        };

        _proto.switchToNextStage = function switchToNextStage() {
          this._currentStageIndex = 0;

          switch (this._stageType) {
            case StageType.Start:
              this._stageType = StageType.Repeating;
              break;

            case StageType.End:
              this._sequenceEnded = true;
              this.onEndGameSequence();
              break;
          }
        };

        _proto.getStages = function getStages(stageType) {
          switch (stageType) {
            case StageType.Start:
              return this._startStages;

            case StageType.Repeating:
              return this._repeatingStages;

            case StageType.End:
              return this._endStages;
          }
        };

        _proto.addStartStages = function addStartStages(stages) {
          this._startStages = stages;
        };

        _proto.addRepeatingStages = function addRepeatingStages(stages) {
          this._repeatingStages = stages;
        };

        _proto.addEndStages = function addEndStages(stages) {
          this._endStages = stages;
        };

        _proto.startSequance = function startSequance() {
          console.log("Start Sequance");
          this._currentStageIndex = 0;
          this._stageType = StageType.Start;
        };

        _proto.endSequance = function endSequance() {
          console.log("End Sequance");
          this._currentStageIndex = 0;
          this._stageType = StageType.End;
        };

        _proto.increaseStageCounter = function increaseStageCounter() {
          if (this._stageType == StageType.Repeating) {
            this._currentStageIndex = (this._currentStageIndex + 1) % this._repeatingStages.length;
          } else {
            this._currentStageIndex++;
          }
        };

        _createClass(StageController, [{
          key: "isStarted",
          get: function get() {
            return this._stageType != StageType.None;
          }
        }]);

        return StageController;
      }());

      var StageType = /*#__PURE__*/function (StageType) {
        StageType[StageType["None"] = 0] = "None";
        StageType[StageType["Start"] = 1] = "Start";
        StageType[StageType["Repeating"] = 2] = "Repeating";
        StageType[StageType["End"] = 3] = "End";
        return StageType;
      }(StageType || {});

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/Tile.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  var _createClass, cclegacy;

  return {
    setters: [function (module) {
      _createClass = module.createClass;
    }, function (module) {
      cclegacy = module.cclegacy;
    }],
    execute: function () {
      cclegacy._RF.push({}, "7c43fDWBfhHiqt/Uo4q/r4P", "Tile", undefined);

      var Tile = exports('Tile', /*#__PURE__*/function () {
        function Tile(x, y, color, id) {
          if (id === void 0) {
            id = Tile._idCounter++;
          }

          this._id = void 0;
          this._x = void 0;
          this._y = void 0;
          this._color = void 0;
          this._id = id;
          this._x = x;
          this._y = y;
          this._color = color;
        }

        var _proto = Tile.prototype;

        _proto.setPosition = function setPosition(_ref) {
          var x = _ref.x,
              y = _ref.y;
          this._x = x;
          this._y = y;
        };

        _createClass(Tile, [{
          key: "id",
          get: function get() {
            return this._id;
          }
        }, {
          key: "x",
          get: function get() {
            return this._x;
          }
        }, {
          key: "y",
          get: function get() {
            return this._y;
          }
        }, {
          key: "color",
          get: function get() {
            return this._color;
          }
        }]);

        return Tile;
      }());
      Tile._idCounter = 0;

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/TileComponent.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './Binder.ts'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, CCFloat, Sprite, tween, Vec3, Component, Binder;

  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      CCFloat = module.CCFloat;
      Sprite = module.Sprite;
      tween = module.tween;
      Vec3 = module.Vec3;
      Component = module.Component;
    }, function (module) {
      Binder = module.Binder;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _class, _class2, _descriptor, _descriptor2;

      cclegacy._RF.push({}, "a2fe1Y4PlRMfpYdETR1x6hr", "TileComponent", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;
      var TileComponent = exports('TileComponent', (_dec = ccclass('TileComponent'), _dec2 = property(CCFloat), _dec3 = property(CCFloat), _dec(_class = (_class2 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(TileComponent, _Component);

        function TileComponent() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;

          _initializerDefineProperty(_this, "moveDuration", _descriptor, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "destroyDuration", _descriptor2, _assertThisInitialized(_this));

          _this._model = void 0;
          _this._sprite = void 0;
          _this._performAction = void 0;
          return _this;
        }

        var _proto = TileComponent.prototype;

        _proto.onLoad = function onLoad() {
          var sprite = this.getComponent(Sprite);

          if (sprite) {
            this._sprite = sprite;
          } else {
            console.error('TileComponent init: Sprite component not found');
          }

          var binder = Binder.getInstance();
          this._performAction = binder.resolve("ISetAndPerformeAction");
        };

        _proto.init = function init(model) {
          this._model = model;
          this.node.active = true;
          this._sprite.color = this._model.color;
        };

        _proto.pool = function pool(_pool) {
          var _this2 = this;

          tween(this.node).to(this.destroyDuration, {
            scale: new Vec3(0, 0, 0)
          }).call(function () {
            _this2.node.scale = new Vec3(1, 1, 1);

            _pool["return"](_this2);
          }).start();
        };

        _proto.moveTo = function moveTo(x, y) {
          tween(this.node).to(this.moveDuration, {
            position: new Vec3(x, y, 0)
          }).start();
        };

        _proto.onTileClicked = function onTileClicked() {
          console.log('TileComponent onTileClicked');

          this._performAction.performActionOnCellAt(this._model.x, this._model.y);
        };

        return TileComponent;
      }(Component), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "moveDuration", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 0.7;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "destroyDuration", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 0.2;
        }
      })), _class2)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/TurnsComponent.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './Binder.ts'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, Label, Component, Binder;

  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Label = module.Label;
      Component = module.Component;
    }, function (module) {
      Binder = module.Binder;
    }],
    execute: function () {
      var _dec, _dec2, _class, _class2, _descriptor;

      cclegacy._RF.push({}, "26c8bmNjndLRrpcq1RzeSMC", "TurnsComponent", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;
      var TurnsComponent = exports('TurnsComponent', (_dec = ccclass('TurnsComponent'), _dec2 = property(Label), _dec(_class = (_class2 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(TurnsComponent, _Component);

        function TurnsComponent() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;

          _initializerDefineProperty(_this, "turns", _descriptor, _assertThisInitialized(_this));

          _this._stats = void 0;
          return _this;
        }

        var _proto = TurnsComponent.prototype;

        _proto.onLoad = function onLoad() {
          if (!this.turns) {
            throw new Error('turns is null');
          }

          var binder = Binder.getInstance();
          this._stats = binder.resolve("IReadStatsAndAddObserver");

          this._stats.addObserver(this);
        };

        _proto.notified = function notified() {
          this.turns.string = (this._stats.maxTurns - this._stats.currentTurns).toString();
        };

        return TurnsComponent;
      }(Component), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "turns", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _class2)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/WaitForActionStage.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  var _createClass, cclegacy;

  return {
    setters: [function (module) {
      _createClass = module.createClass;
    }, function (module) {
      cclegacy = module.cclegacy;
    }],
    execute: function () {
      cclegacy._RF.push({}, "ba2d2YZ8KJMuIGqiKKZ/2hH", "WaitForActionStage", undefined);

      var WaitForActionStage = exports('WaitForActionStage', /*#__PURE__*/function () {
        function WaitForActionStage(observerAdder, actionAllower) {
          this._observerAdder = void 0;
          this._actionAllower = void 0;
          this._isStarted = void 0;
          this._isDone = void 0;
          this._observerAdder = observerAdder;
          this._actionAllower = actionAllower;
        }

        var _proto = WaitForActionStage.prototype;

        _proto.reset = function reset() {
          this._isStarted = false;
          this._isDone = false;
        };

        _proto.execute = function execute() {
          console.log("WaitForActionStage execute");
          this._isStarted = true;

          this._observerAdder.addObserver(this);
        };

        _proto.notified = function notified() {
          if (this._actionAllower.isActionAllowed) {
            this._isDone = true;
          }
        };

        _createClass(WaitForActionStage, [{
          key: "isStarted",
          get: function get() {
            return this._isStarted;
          }
        }, {
          key: "isDone",
          get: function get() {
            return this._isDone;
          }
        }]);

        return WaitForActionStage;
      }());

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/WaitForTimeStage.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  var _createClass, cclegacy;

  return {
    setters: [function (module) {
      _createClass = module.createClass;
    }, function (module) {
      cclegacy = module.cclegacy;
    }],
    execute: function () {
      cclegacy._RF.push({}, "80856cXwyRPR7bc7Mw6povH", "WaitForTimeStage", undefined);

      var WaitForTimeStage = exports('WaitForTimeStage', /*#__PURE__*/function () {
        function WaitForTimeStage(time) {
          this._time = void 0;
          this._isStarted = void 0;
          this._isDone = void 0;
          this._time = time;
        }

        var _proto = WaitForTimeStage.prototype;

        _proto.reset = function reset() {
          this._isStarted = false;
          this._isDone = false;
        };

        _proto.execute = function execute() {
          var _this = this;

          console.log("WaitForTimeStage execute");
          this._isStarted = true;
          setTimeout(function () {
            _this._isDone = true;
          }, this._time * 1000);
        };

        _createClass(WaitForTimeStage, [{
          key: "isStarted",
          get: function get() {
            return this._isStarted;
          }
        }, {
          key: "isDone",
          get: function get() {
            return this._isDone;
          }
        }]);

        return WaitForTimeStage;
      }());

      cclegacy._RF.pop();
    }
  };
});

(function(r) {
  r('virtual:///prerequisite-imports/main', 'chunks:///_virtual/main'); 
})(function(mid, cid) {
    System.register(mid, [cid], function (_export, _context) {
    return {
        setters: [function(_m) {
            var _exportObj = {};

            for (var _key in _m) {
              if (_key !== "default" && _key !== "__esModule") _exportObj[_key] = _m[_key];
            }
      
            _export(_exportObj);
        }],
        execute: function () { }
    };
    });
});
//# sourceMappingURL=index.js.map