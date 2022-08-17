import { IPaginaFormulario } from "../shared/pagina.create.interface.js";
import { IPaginaHTML } from "../shared/pagina.interface.js";
import { IRepositorio } from "../shared/repositorio.interface.js";
import { Prioridade } from "./prioridade.enum.js";
import { Tarefa } from "./tarefa.model.js";
import { TarefaRepositoryLocalStorage } from "./tarefa.repository.local-storage.js";

class TarefaPaginaEdicao implements IPaginaHTML, IPaginaFormulario {
  private txtEditarDescricao: HTMLInputElement;
  private selectEditarPrioridade: HTMLInputElement;
  private btnEditar: HTMLButtonElement;
  private btnExibir: HTMLButtonElement;

  constructor(private repositorioTarefas: IRepositorio<Tarefa>) {
    this.configurarElementos();
  }

  configurarElementos(): void {
    this.txtEditarDescricao = document.getElementById(
      "txtEditarDescricao"
    ) as HTMLInputElement;
    this.selectEditarPrioridade = document.getElementById(
      "selectEditarPrioridade"
    ) as HTMLInputElement;

    this.btnEditar = document.getElementById("btnEditar") as HTMLButtonElement;
    this.btnExibir = document.getElementById("btnExibir") as HTMLButtonElement;

    // operador discard _
    this.btnEditar.addEventListener("click", (_evt) => this.gravarRegistros());
    this.btnExibir.addEventListener("click", (_evt) =>
      this.exibirLinhaSelecionada()
    );
  }

  gravarRegistros(): void {
    //ver aqui, input??
    let selectedRow = document.getElementById(
      "selectedRow"
    ) as HTMLInputElement;

    let tarefaSelecionada =
      this.repositorioTarefas.tarefas[Number(selectedRow.value) - 1];
    tarefaSelecionada.descricao = this.txtEditarDescricao.value;
    tarefaSelecionada.prioridade = this.selectEditarPrioridade.value;

    // const prioridade = this.selectEditarPrioridade.value as Prioridade;

    // const novaTarefa = new Tarefa(this.txtEditarDescricao.value, prioridade);

    this.repositorioTarefas.editar(tarefaSelecionada);

    console.log(this.repositorioTarefas.tarefas[Number(selectedRow.value) - 1]);
    console.log(tarefaSelecionada);

    // método para redirecionar usuario
    window.location.reload();
  }

  exibirLinhaSelecionada(): void {
    //ver aqui, input??
    let selectedRow = document.getElementById(
      "selectedRow"
    ) as HTMLInputElement;

    let aux = selectedRow.value;
    if (aux === "") {
      alert("selecione uma linha antes");
      return;
    }
    console.log(aux);

    let hiddenEdit = document.getElementById("hiddenEdit");
    hiddenEdit.classList.toggle("hidden");

    let linhas = document.getElementsByClassName("linhas");

    let tarefaSelecionada =
      this.repositorioTarefas.tarefas[Number(selectedRow.value) - 1];
    this.txtEditarDescricao.value = tarefaSelecionada.descricao;
    this.selectEditarPrioridade.value = tarefaSelecionada.prioridade;

    // const prioridade = this.selectEditarPrioridade.value as Prioridade;
  }
}

new TarefaPaginaEdicao(new TarefaRepositoryLocalStorage());
