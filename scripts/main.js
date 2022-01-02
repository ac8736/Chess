// querySelectorAll("div[has-piece]");

// const place = document.getElementById("a2");
// place.addEventListener("click", function () {
//   document.getElementById("a3").classList.add("moveable");
// });

// function move() {
//   if (document.getElementById("a3").classList.contains("moveable")) {
//     place.removeChild(place.children[0]);
//     let img = document.createElement("img");
//     img.src = "../sprites/whitePawn.png";
//     img.classList.add("resize");
//     document.getElementById("a3").appendChild(img);
//   }
// }

// function move() {
//   const pieces = document.querySelectorAll("div[has-piece]"); //returns a list of all the divs with a attribute has-piece
//   pieces[0].removeChild(pieces[0].children[0]);  // .children returns a list of all the children of a node
// }

// appendChild() to add a child element, first do createElement('element name')
// .classList.add() to add a class

//window.onload = test;

function ChessPiece(pieceType, color, boardPlace) {
  this.pieceType = pieceType;
  this.color = color;
  this.boardPlace = boardPlace;
}

var whitePawnA = new ChessPiece("pawn", "white", "a2");
var whitePawnB = new ChessPiece("pawn", "white", "b2");
var whitePawnC = new ChessPiece("pawn", "white", "c2");
var whitePawnD = new ChessPiece("pawn", "white", "d2");
var whitePawnE = new ChessPiece("pawn", "white", "e2");
var whitePawnF = new ChessPiece("pawn", "white", "f2");
var whitePawnG = new ChessPiece("pawn", "white", "g2");
var whitePawnH = new ChessPiece("pawn", "white", "h2");
var whiteKnightA = new ChessPiece("knight", "white", "b1");
var whiteKnightB = new ChessPiece("knight", "white", "g1");
var whiteBishopA = new ChessPiece("bishop", "white", "c1");
var whiteBishopB = new ChessPiece("bishop", "white", "f1");
var whiteRookA = new ChessPiece("rook", "white", "a1");
var whiteRookB = new ChessPiece("rook", "white", "h1");
var whiteQueen = new ChessPiece("queen", "white", "d1");
var whiteKing = new ChessPiece("king", "white", "e1");

var blackPawnA = new ChessPiece("pawn", "black", "a7");
var blackPawnB = new ChessPiece("pawn", "black", "b7");
var blackPawnC = new ChessPiece("pawn", "black", "c7");
var blackPawnD = new ChessPiece("pawn", "black", "d7");
var blackPawnE = new ChessPiece("pawn", "black", "e7");
var blackPawnF = new ChessPiece("pawn", "black", "f7");
var blackPawnG = new ChessPiece("pawn", "black", "g7");
var blackPawnH = new ChessPiece("pawn", "black", "h7");
var blackKnightA = new ChessPiece("knight", "black", "b8");
var blackKnightB = new ChessPiece("knight", "black", "g8");
var blackBishopA = new ChessPiece("bishop", "black", "c8");
var blackBishopB = new ChessPiece("bishop", "black", "f8");
var blackRookA = new ChessPiece("rook", "black", "a8");
var blackRookB = new ChessPiece("rook", "black", "h8");
var blackQueen = new ChessPiece("queen", "black", "d8");
var blackKing = new ChessPiece("king", "black", "e8");

const collectionOfPieces = [
  whitePawnA,
  whitePawnB,
  whitePawnC,
  whitePawnD,
  whitePawnE,
  whitePawnF,
  whitePawnG,
  whitePawnH,
  whiteRookA,
  whiteRookB,
  whiteBishopA,
  whiteBishopB,
  whiteKnightA,
  whiteKnightB,
  whiteKing,
  whiteQueen,
  blackPawnA,
  blackPawnB,
  blackPawnC,
  blackPawnD,
  blackPawnE,
  blackPawnF,
  blackPawnG,
  blackPawnH,
  blackRookA,
  blackRookB,
  blackBishopA,
  blackBishopB,
  blackKnightA,
  blackKnightB,
  blackKing,
  blackQueen,
];

var highlightedPlaces = [];
var currentPiece;

function removeHighlightedPlaces() {
  if (highlightedPlaces.length !== 0) {
    highlightedPlaces.forEach((id) => {
      document.getElementById(id).classList.remove("highlight");
      document.getElementById(id).removeEventListener("click", move);
    });
  }
}

function possiblePawnMoves(pawn) {
  removeHighlightedPlaces();
  let availableMoves = [];
  if (pawn.boardPlace[1] === "2") {
    availableMoves.push(
      (pawn.boardPlace[0] + (parseInt(pawn.boardPlace[1]) + 1)).toString()
    );
    availableMoves.push(
      (pawn.boardPlace[0] + (parseInt(pawn.boardPlace[1]) + 2)).toString()
    );
    availableMoves.forEach((id) => {
      highlightedPlaces.push(id);
      document.getElementById(id).classList.add("highlight");
      document.getElementById(id).addEventListener("click", move);
    });
    return;
  } else if (pawn.boardPlace[1] === "7") {
    availableMoves.push(
      (pawn.boardPlace[0] + (parseInt(pawn.boardPlace[1]) - 1)).toString()
    );
    availableMoves.push(
      (pawn.boardPlace[0] + (parseInt(pawn.boardPlace[1]) - 2)).toString()
    );
    availableMoves.forEach((id) => {
      highlightedPlaces.push(id);
      document.getElementById(id).classList.add("highlight");
      document.getElementById(id).addEventListener("click", move);
    });
    return;
  } else if (pawn.boardPlace[1] !== "2" || pawn.boardPlace[1] !== "7") {
    if (pawn.color == "white") {
      availableMoves.push(
        (pawn.boardPlace[0] + (parseInt(pawn.boardPlace[1]) + 1)).toString()
      );
    } else {
      availableMoves.push(
        (pawn.boardPlace[0] + (parseInt(pawn.boardPlace[1]) - 1)).toString()
      );
    }
    availableMoves.forEach((id) => {
      highlightedPlaces.push(id);
      document.getElementById(id).classList.add("highlight");
      document.getElementById(id).addEventListener("click", move);
    });
    return;
  }
}

function move() {
  let currentPos = currentPiece.boardPlace;
  let newPos = this.id;
  currentPiece.boardPlace = newPos;
  document.getElementById(currentPos).removeAttribute("has-piece");
  let myElement = document.getElementById(currentPos);
  myElement.removeChild(myElement.children[0]);
  let newPiece = document.createElement("img");
  if (currentPiece.color == "white") {
    newPiece.src = "../sprites/WhitePawn.png";
    document.getElementById(newPos).setAttribute("has-piece", "white");
  } else {
    newPiece.src = "../sprites/BlackPawn.png";
    document.getElementById(newPos).setAttribute("has-piece", "black");
  }
  newPiece.classList.add("resize");
  document.getElementById(newPos).appendChild(newPiece);
  removeHighlightedPlaces();
  initalizePieces();
}

function findPossibleMoves(id) {
  const selectedPiece = collectionOfPieces.find(
    (element) => element.boardPlace === id
  );
  switch (selectedPiece.pieceType) {
    case "pawn":
      currentPiece = selectedPiece;
      possiblePawnMoves(selectedPiece);
      break;
    case "knight":
      break;
    case "bishop":
      break;
    case "rook":
      break;
    case "king":
      break;
    case "queen":
      break;
  }
  return;
}

function initalizePieces() {
  var allWhitePieces = document.querySelectorAll("div[has-piece='white']");
  allWhitePieces.forEach(function (element) {
    element.addEventListener("click", function () {
      findPossibleMoves(element.id);
    });
  });

  var allBlackPieces = document.querySelectorAll("div[has-piece='black']");
  allBlackPieces.forEach(function (element) {
    element.addEventListener("click", function () {
      findPossibleMoves(element.id);
    });
  });
}

window.onload = initalizePieces;
