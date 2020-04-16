export var GameStates;
(function (GameStates) {
    GameStates[GameStates["None"] = 0] = "None";
    GameStates[GameStates["Title"] = 1] = "Title";
    GameStates[GameStates["RegularRound"] = 2] = "RegularRound";
    GameStates[GameStates["Result"] = 3] = "Result";
})(GameStates || (GameStates = {}));
