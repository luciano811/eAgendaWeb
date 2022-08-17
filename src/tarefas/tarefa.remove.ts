import { IPaginaFormulario } from "../shared/pagina.create.interface.js";
import { IPaginaHTML } from "../shared/pagina.interface.js";
import { IRepositorio } from "../shared/repositorio.interface.js";
import { Prioridade } from "./prioridade.enum.js";
import { Tarefa } from "./tarefa.model.js";
import { TarefaRepositoryLocalStorage } from "./tarefa.repository.local-storage.js";

class TarefaPaginaExclusao implements IPaginaHTML, IPaginaFormulario {
  private txtEditarDescricao: HTMLInputElement;
  private selectEditarPrioridade: HTMLSelectElement;
  private btnEditar: HTMLButtonElement;
  private btnRemover: HTMLButtonElement;
  private tabela: HTMLTableElement;

  constructor(private repositorioTarefas: IRepositorio<Tarefa>) {
    this.configurarElementos();
  }

  configurarElementos(): void {
    this.txtEditarDescricao = document.getElementById(
      "txtEditarDescricao"
    ) as HTMLInputElement;
    this.btnRemover = document.getElementById(
      "btnRemover"
    ) as HTMLButtonElement;

    // operador discard _
    //this.btnEditar.addEventListener("click", (_evt) => this.gravarRegistros());
    this.btnRemover.addEventListener("click", (_evt) => this.removerRegistro());

    let tabela = <HTMLTableElement>document.getElementById("tabela");

    for (let i = 1; i < tabela.rows.length; i++) {
      let linha = <HTMLTableRowElement>tabela.rows[i];
      linha.onclick = function () {
        let selectedRow = document.getElementById(
          "selectedRow"
        ) as HTMLInputElement;
        selectedRow.value = String(i);

        let btnExibir = document.getElementById(
          "hiddenEdit"
        ) as HTMLInputElement;

        //btnExibir.classList
        btnExibir.classList.add("hidden");

        let row = linha.rowIndex;
        let oi = <HTMLTableCellElement>linha.cells[0];

        for (let index = 0; index < tabela.rows.length; index++) {
          const element = tabela.rows[index];
          element.style.color = "white";
        }
        console.log(selectedRow.value);

        linha.style.color = "red";
      };
    }
  }

  gravarRegistros(): void {
    //ver aqui, input??

    var selectEditarPrioridade = document.getElementById(
      "selectEditarPrioridade"
    ) as HTMLSelectElement;
    console.log(selectEditarPrioridade.value);

    const prioridade = <Prioridade>selectEditarPrioridade.value.toString();
    const novaTarefa = new Tarefa(this.txtEditarDescricao.value, prioridade);

    console.log(novaTarefa.id);
    this.repositorioTarefas.remover(novaTarefa);

    // método para redirecionar usuario
    // window.location.href = "tarefa.list.html";
  }

  removerRegistro(): void {
    let selectedRow = document.getElementById(
      "selectedRow"
    ) as HTMLInputElement;
    //this.repositorioTarefas.tarefas.splice(Number(selectedRow.value), 1);
    this.repositorioTarefas.remover(
      this.repositorioTarefas.tarefas[Number(selectedRow.value) - 1]
    );
    console.log(selectedRow.value);
    console.log(this.repositorioTarefas.tarefas);

    let tabela = <HTMLTableElement>document.getElementById("tabela");

    //tabela.deleteRow(Number(selectedRow.value));
    window.location.reload();
  }
}

new TarefaPaginaExclusao(new TarefaRepositoryLocalStorage());
