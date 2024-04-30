var linhas: number,
  colunas: number,
  bombas: number,
  matriz: number[][],
  tabela: HTMLTableElement;

function gerarMatriz(l: number, c: number) {
  matriz = [];
  for (let i = 0; i < l; i++) {
    matriz[i] = new Array<number>(c).fill(0);
  }
  console.log(matriz);
}
function gerarTabela(l: number, c: number) {
  gerarMatriz(l, c);
  let str: string = "";
  for (let i = 0; i < l; i++) {
    str += "<tr>";
    for (let j = 0; j < c; j++) {
      str += "<td class='blocked'></td>";
    }
    str += "</tr>";
  }
  tabela.innerHTML = str;
}
function mostrarMatriz() {
  for (let i = 0; i < linhas; i++) {
    for (let j = 0; j < colunas; j++) {
      if (matriz[i][j] === -1) {
        tabela.rows[i].cells[j].innerHTML = "&#128163;";
      } else {
        tabela.rows[i].cells[j].innerHTML = matriz[i][j].toString();
      }
    }
  }
}
function gerarBombas() {
  for (let i = 0; i < bombas; ) {
    let linha = Math.floor(Math.random() * linhas);
    let coluna = Math.floor(Math.random() * colunas);
    if (matriz[linha][coluna] === 0) {
      matriz[linha][coluna] = -1;
      i++;
    }
  }
}
function gerarNumero(l: number, c: number) {
  let count = 0;
  for (let i = l - 1; i <= l + 1; i++) {
    for (let j = c - 1; j <= c + 1; j++) {
      if (i >= 0 && i < linhas && j >= 0 && j < colunas) {
        if (matriz[i][j] === -1) {
          count++;
        }
      }
    }
  }
  matriz[l][c] = count;
}
function gerarNumeros() {
  for (let i = 0; i < linhas; i++) {
    for (let j = 0; j < colunas; j++) {
      if (matriz[i][j] !== -1) {
        gerarNumero(i, j);
      }
    }
  }
}
function bandeira(event: MouseEvent) {
  let cell = <HTMLTableCellElement>event.target;
  let linha =
    cell.parentNode instanceof HTMLTableRowElement
      ? cell.parentNode.rowIndex
      : -1;
  let coluna = cell.cellIndex;
  if (cell.className === "blocked") {
    cell.className = "flag";
    cell.innerHTML = "&#128681;"; //&#9873;
  } else if (cell.className === "flag") {
    cell.className = "blocked";
    cell.innerHTML = "";
  }
  return false;
}
function init() {
  let diff: HTMLSelectElement;
  tabela = <HTMLTableElement>document.getElementById("tabela");
  tabela.onclick = verificar;
  tabela.oncontextmenu = bandeira;
  diff = <HTMLSelectElement>document.getElementById("dificuldade");
  switch (parseInt(diff!.value)) {
    case 0:
      linhas = 9;
      colunas = 9;
      bombas = 10;
      break;
    case 1:
      linhas = 16;
      colunas = 16;
      bombas = 40;
      break;
    default:
      linhas = 16;
      colunas = 30;
      bombas = 99;
      break;
  }
  gerarTabela(linhas, colunas);
  gerarBombas();
  gerarNumeros();
  //    mostrarMatriz();
}
function limparCelulas(l: number, c: number) {
  for (let i = l - 1; i <= l + 1; i++) {
    for (let j = c - 1; j <= c + 1; j++) {
      if (i >= 0 && i < linhas && j >= 0 && j < colunas) {
        let cell = tabela.rows[i].cells[j];
        if (cell.className !== "blank") {
          switch (matriz[i][j]) {
            case -1:
              break;
            case 0:
              cell.innerHTML = "";
              cell.className = "blank";
              limparCelulas(i, j);
              break;
            default:
              cell.innerHTML = matriz[i][j].toString();
              cell.className = "n" + matriz[i][j];
          }
        }
      }
    }
  }
}
function mostrarBombas() {
  for (let i = 0; i < linhas; i++) {
    for (let j = 0; j < colunas; j++) {
      if (matriz[i][j] === -1) {
        let cell = tabela.rows[i].cells[j];
        cell.innerHTML = "&#128163;";
        cell.className = "blank";
      }
    }
  }
}
function verificar(event: MouseEvent) {
  let cell = <HTMLTableCellElement>event.target;
  if (cell.className !== "flag") {
    let linha =
      cell.parentNode instanceof HTMLTableRowElement
        ? cell.parentNode.rowIndex
        : -1;
    let coluna = cell.cellIndex;
    switch (matriz[linha][coluna]) {
      case -1:
        mostrarBombas();
        cell.style.backgroundColor = "red";
        tabela.onclick = null;
        tabela.oncontextmenu = null;
        alert("Você perdeu!");
        break;
      case 0:
        limparCelulas(linha, coluna);
        break;
      default:
        cell.innerHTML = matriz[linha][coluna].toString();
        cell.className = "n" + matriz[linha][coluna];
    }
    fimDeJogo();
  }
}
function fimDeJogo() {
  const cells = document.querySelectorAll(".blocked, .flag");
  if (cells.length === bombas) {
    mostrarBombas();
    tabela.onclick = null;
    tabela.oncontextmenu = null;
    alert("Você venceu!");
  }
}
function registerEvents() {
  init();
  const diff = <HTMLSelectElement>document.getElementById("dificuldade");
  diff.onchange = init;
}
onload = registerEvents;
