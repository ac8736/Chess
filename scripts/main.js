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
      if (document.getElementById(id).classList.contains("red-highlight")) {
        document.getElementById(id).classList.remove("red-highlight");
      }
      document.getElementById(id).removeEventListener("click", move);
      document.getElementById(id).removeEventListener("click", destroy);
    });
  }
  highlightedPlaces.splice(0, highlightedPlaces.length);
}

function removeAllEvents() {
  var allElements = document.querySelectorAll("div[has-piece]");
  allElements.forEach(function (element) {
    element.removeEventListener("click", findPossibleMoves);
  });
}

function possiblePawnMoves(pawn) {
  removeHighlightedPlaces();
  let availableMoves = [];
  if (pawn.color == "white") {
    const topleft = () => {
      let numGrid = parseInt(pawn.boardPlace[1]) + 1;
      let alphaGrid = String.fromCharCode(pawn.boardPlace[0].charCodeAt(0) - 1);
      if (alphaGrid < "a") {
        return "";
      }
      return alphaGrid + numGrid;
    };
    const topright = () => {
      let numGrid = parseInt(pawn.boardPlace[1]) + 1;
      let alphaGrid = String.fromCharCode(pawn.boardPlace[0].charCodeAt(0) + 1);
      if (alphaGrid > "h") {
        return "";
      }
      return alphaGrid + numGrid;
    };
    if (topleft() != "") {
      let myElement = document.getElementById(topleft());
      if (myElement.children.length != 0) {
        if (
          myElement.children[0].tagName == "IMG" &&
          myElement.getAttribute("has-piece") == "black"
        ) {
          myElement.classList.add("red-highlight");
          myElement.addEventListener("click", destroy);
          myElement.removeEventListener("click", findPossibleMoves);
          highlightedPlaces.push(topleft());
        }
      }
    }
    if (topright() != "") {
      let myElement = document.getElementById(topright());
      if (myElement.children.length != 0) {
        if (
          myElement.children[0].tagName == "IMG" &&
          myElement.getAttribute("has-piece") == "black"
        ) {
          myElement.classList.add("red-highlight");
          myElement.addEventListener("click", destroy);
          myElement.removeEventListener("click", findPossibleMoves);
          highlightedPlaces.push(topright());
        }
      }
    }
  }
  if (pawn.color == "black") {
    const bottomleft = () => {
      let numGrid = parseInt(pawn.boardPlace[1]) - 1;
      let alphaGrid = String.fromCharCode(pawn.boardPlace[0].charCodeAt(0) - 1);
      if (alphaGrid < "a") {
        return "";
      }
      return alphaGrid + numGrid;
    };
    const bottomright = () => {
      let numGrid = parseInt(pawn.boardPlace[1]) - 1;
      let alphaGrid = String.fromCharCode(pawn.boardPlace[0].charCodeAt(0) + 1);
      if (alphaGrid > "h") {
        return "";
      }
      return alphaGrid + numGrid;
    };
    if (bottomleft() != "") {
      let myElement = document.getElementById(bottomleft());
      if (myElement.children.length != 0) {
        if (
          myElement.children[0].tagName == "IMG" &&
          myElement.getAttribute("has-piece") == "white"
        ) {
          myElement.classList.add("red-highlight");
          myElement.addEventListener("click", destroy);
          myElement.removeEventListener("click", findPossibleMoves);
          highlightedPlaces.push(bottomleft());
        }
      }
    }
    if (bottomright() != "") {
      let myElement = document.getElementById(bottomright());
      if (myElement.children.length != 0) {
        if (
          myElement.children[0].tagName == "IMG" &&
          myElement.getAttribute("has-piece") == "white"
        ) {
          myElement.classList.add("red-highlight");
          myElement.addEventListener("click", destroy);
          myElement.removeEventListener("click", findPossibleMoves);
          highlightedPlaces.push(bottomright());
        }
      }
    }
  }
  if (pawn.boardPlace[1] === "2" && pawn.color == "white") {
    if (
      document.getElementById(
        (pawn.boardPlace[0] + (parseInt(pawn.boardPlace[1]) + 1)).toString()
      ).children.length == 0
    ) {
      availableMoves.push(
        (pawn.boardPlace[0] + (parseInt(pawn.boardPlace[1]) + 1)).toString()
      );
      if (
        document.getElementById(
          (pawn.boardPlace[0] + (parseInt(pawn.boardPlace[1]) + 2)).toString()
        ).children.length == 0
      ) {
        availableMoves.push(
          (pawn.boardPlace[0] + (parseInt(pawn.boardPlace[1]) + 2)).toString()
        );
      }
    }
    if (availableMoves.length != 0) {
      availableMoves.forEach((id) => {
        highlightedPlaces.push(id);
        document.getElementById(id).classList.add("highlight");
        document.getElementById(id).addEventListener("click", move);
      });
    }
    return;
  } else if (pawn.boardPlace[1] === "7" && pawn.color == "black") {
    if (
      document.getElementById(
        (pawn.boardPlace[0] + (parseInt(pawn.boardPlace[1]) - 1)).toString()
      ).children.length == 0
    ) {
      availableMoves.push(
        (pawn.boardPlace[0] + (parseInt(pawn.boardPlace[1]) - 1)).toString()
      );
      if (
        document.getElementById(
          (pawn.boardPlace[0] + (parseInt(pawn.boardPlace[1]) - 2)).toString()
        ).children.length == 0
      ) {
        availableMoves.push(
          (pawn.boardPlace[0] + (parseInt(pawn.boardPlace[1]) - 2)).toString()
        );
      }
    }
    if (availableMoves.length != 0) {
      availableMoves.forEach((id) => {
        highlightedPlaces.push(id);
        document.getElementById(id).classList.add("highlight");
        document.getElementById(id).addEventListener("click", move);
      });
    }
    return;
  } else if (pawn.boardPlace[1] !== "2" || pawn.boardPlace[1] !== "7") {
    if (pawn.color == "white") {
      if (
        document.getElementById(
          (pawn.boardPlace[0] + (parseInt(pawn.boardPlace[1]) + 1)).toString()
        ).children.length == 0
      ) {
        availableMoves.push(
          (pawn.boardPlace[0] + (parseInt(pawn.boardPlace[1]) + 1)).toString()
        );
      }
    } else {
      if (
        document.getElementById(
          (pawn.boardPlace[0] + (parseInt(pawn.boardPlace[1]) - 1)).toString()
        ).children.length == 0
      ) {
        availableMoves.push(
          (pawn.boardPlace[0] + (parseInt(pawn.boardPlace[1]) - 1)).toString()
        );
      }
    }
    availableMoves.forEach((id) => {
      highlightedPlaces.push(id);
      document.getElementById(id).classList.add("highlight");
      document.getElementById(id).addEventListener("click", move);
    });
  }
}

function findPossibleKnightMoves(knight) {
  removeHighlightedPlaces();
  let availableMoves = [];
  let numPlace = parseInt(knight.boardPlace[1]);
  let alphaPlace = knight.boardPlace[0];

  if (numPlace + 2 < 9) {
    // good
    if (String.fromCharCode(alphaPlace.charCodeAt(0) + 1) <= "h") {
      if (
        document.getElementById(
          String.fromCharCode(alphaPlace.charCodeAt(0) + 1) +
            (numPlace + 2).toString()
        ).children.length == 0
      ) {
        availableMoves.push(
          String.fromCharCode(alphaPlace.charCodeAt(0) + 1) +
            (numPlace + 2).toString()
        );
      }
    }
    if (String.fromCharCode(alphaPlace.charCodeAt(0) - 1) >= "a") {
      if (
        document.getElementById(
          String.fromCharCode(alphaPlace.charCodeAt(0) - 1) +
            (numPlace + 2).toString()
        ).children.length == 0
      ) {
        availableMoves.push(
          String.fromCharCode(alphaPlace.charCodeAt(0) - 1) +
            (numPlace + 2).toString()
        );
      }
    }
  }
  if (numPlace - 2 > 0) {
    // good
    if (String.fromCharCode(alphaPlace.charCodeAt(0) + 1) <= "h") {
      if (
        document.getElementById(
          String.fromCharCode(alphaPlace.charCodeAt(0) + 1) +
            (numPlace - 2).toString()
        ).children.length == 0
      ) {
        availableMoves.push(
          String.fromCharCode(alphaPlace.charCodeAt(0) + 1) +
            (numPlace - 2).toString()
        );
      }
    }
    if (String.fromCharCode(alphaPlace.charCodeAt(0) - 1) >= "a") {
      if (
        document.getElementById(
          String.fromCharCode(alphaPlace.charCodeAt(0) - 1) +
            (numPlace - 2).toString()
        ).children.length == 0
      ) {
        availableMoves.push(
          String.fromCharCode(alphaPlace.charCodeAt(0) - 1) +
            (numPlace - 2).toString()
        );
      }
    }
  }
  if (String.fromCharCode(alphaPlace.charCodeAt(0) + 2) <= "h") {
    // good
    if (numPlace + 1 < 9) {
      if (
        document.getElementById(
          String.fromCharCode(alphaPlace.charCodeAt(0) + 2) +
            (numPlace + 1).toString()
        ).children.length == 0
      ) {
        availableMoves.push(
          String.fromCharCode(alphaPlace.charCodeAt(0) + 2) +
            (numPlace + 1).toString()
        );
      }
    }
    if (numPlace - 1 > 0) {
      if (
        document.getElementById(
          String.fromCharCode(alphaPlace.charCodeAt(0) + 2) +
            (numPlace - 1).toString()
        ).children.length == 0
      ) {
        availableMoves.push(
          String.fromCharCode(alphaPlace.charCodeAt(0) + 2) +
            (numPlace - 1).toString()
        );
      }
    }
  }
  if (String.fromCharCode(alphaPlace.charCodeAt(0) - 2) >= "a") {
    if (numPlace + 1 < 9) {
      if (
        document.getElementById(
          String.fromCharCode(alphaPlace.charCodeAt(0) - 2) +
            (numPlace + 1).toString()
        ).children.length == 0
      ) {
        availableMoves.push(
          String.fromCharCode(alphaPlace.charCodeAt(0) - 2) +
            (numPlace + 1).toString()
        );
      }
    }
    if (numPlace - 1 > 0) {
      if (
        document.getElementById(
          String.fromCharCode(alphaPlace.charCodeAt(0) - 2) +
            (numPlace - 1).toString()
        ).children.length == 0
      ) {
        availableMoves.push(
          String.fromCharCode(alphaPlace.charCodeAt(0) - 2) +
            (numPlace - 1).toString()
        );
      }
    }
  }

  availableMoves.forEach((id) => {
    highlightedPlaces.push(id);
    document.getElementById(id).classList.add("highlight");
    document.getElementById(id).addEventListener("click", move);
  });
}

function move() {
  removeAllEvents();
  removeHighlightedPlaces();
  let currentPos = currentPiece.boardPlace;
  let newPos = this.id;
  if (document.getElementById(newPos).children.length == 0) {
    currentPiece.boardPlace = newPos;
    document.getElementById(currentPos).removeAttribute("has-piece");
    let myElement = document.getElementById(currentPos);
    myElement.removeChild(myElement.children[0]);
    let newPiece = document.createElement("img");
    if (currentPiece.color == "white") {
      switch (currentPiece.pieceType) {
        case "pawn":
          newPiece.src = "../sprites/WhitePawn.png";
          break;
        case "knight":
          newPiece.src = "../sprites/WhiteKnight.png";
          break;
        case "bishop":
          newPiece.src = "../sprites/WhiteBishop.png";
          break;
        case "rook":
          newPiece.src = "../sprites/WhiteRook.png";
          break;
        case "king":
          newPiece.src = "../sprites/WhiteKing.png";
          break;
        case "queen":
          newPiece.src = "../sprites/WhiteQueen.png";
          break;
      }
      document.getElementById(newPos).setAttribute("has-piece", "white");
    } else {
      switch (currentPiece.pieceType) {
        case "pawn":
          newPiece.src = "../sprites/BlackPawn.png";
          break;
        case "knight":
          newPiece.src = "../sprites/BlackKnight.png";
          break;
        case "bishop":
          newPiece.src = "../sprites/BlackBishop.png";
          break;
        case "rook":
          newPiece.src = "../sprites/BlackRook.png";
          break;
        case "king":
          newPiece.src = "../sprites/BlackKing.png";
          break;
        case "queen":
          newPiece.src = "../sprites/BlackQueen.png";
          break;
      }
      document.getElementById(newPos).setAttribute("has-piece", "black");
    }
    newPiece.classList.add("resize");
    document.getElementById(newPos).appendChild(newPiece);
    initalizePieces();
  }
}

function destroy() {
  let currentPos = currentPiece.boardPlace;
  let newPos = this.id;
  for (let i = 0; i < collectionOfPieces.length; i++) {
    if (collectionOfPieces[i].boardPlace == newPos) {
      collectionOfPieces.splice(i, 1);
      break;
    }
  }
  let myElement = document.getElementById(currentPos);
  let deadElement = document.getElementById(newPos);
  myElement.removeChild(myElement.children[0]);
  deadElement.removeChild(deadElement.children[0]);
  currentPiece.boardPlace = newPos;
  let newPiece = document.createElement("img");
  if (currentPiece.color == "white") {
    switch (currentPiece.pieceType) {
      case "pawn":
        newPiece.src = "../sprites/WhitePawn.png";
        break;
      case "knight":
        newPiece.src = "../sprites/WhiteKnight.png";
        break;
      case "bishop":
        newPiece.src = "../sprites/WhiteBishop.png";
        break;
      case "rook":
        newPiece.src = "../sprites/WhiteRook.png";
        break;
      case "king":
        newPiece.src = "../sprites/WhiteKing.png";
        break;
      case "queen":
        newPiece.src = "../sprites/WhiteQueen.png";
        break;
    }
  } else {
    switch (currentPiece.pieceType) {
      case "pawn":
        newPiece.src = "../sprites/BlackPawn.png";
        break;
      case "knight":
        newPiece.src = "../sprites/BlackKnight.png";
        break;
      case "bishop":
        newPiece.src = "../sprites/BlackBishop.png";
        break;
      case "rook":
        newPiece.src = "../sprites/BlackRook.png";
        break;
      case "king":
        newPiece.src = "../sprites/BlackKing.png";
        break;
      case "queen":
        newPiece.src = "../sprites/BlackQueen.png";
        break;
    }
  }
  newPiece.classList.add("resize");
  deadElement.appendChild(newPiece);
  removeHighlightedPlaces();
  removeAllEvents();
  initalizePieces();
}

function findPossibleMoves() {
  const selectedPiece = collectionOfPieces.find(
    (element) => element.boardPlace === this.id
  );
  switch (selectedPiece.pieceType) {
    case "pawn":
      currentPiece = selectedPiece;
      possiblePawnMoves(selectedPiece);
      break;
    case "knight":
      currentPiece = selectedPiece;
      findPossibleKnightMoves(selectedPiece);
      break;
    case "bishop":
      currentPiece = selectedPiece;
      break;
    case "rook":
      currentPiece = selectedPiece;
      break;
    case "king":
      currentPiece = selectedPiece;
      break;
    case "queen":
      currentPiece = selectedPiece;
      break;
  }
  return;
}

function initalizePieces() {
  var allWhitePieces = document.querySelectorAll("div[has-piece='white']");
  allWhitePieces.forEach(function (element) {
    findPossibleMoves.bind(element);
    element.addEventListener("click", findPossibleMoves);
  });

  var allBlackPieces = document.querySelectorAll("div[has-piece='black']");
  allBlackPieces.forEach(function (element) {
    findPossibleMoves.bind(element);
    element.addEventListener("click", findPossibleMoves);
  });
}

window.onload = initalizePieces;
