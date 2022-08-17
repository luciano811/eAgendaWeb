import { IPaginaFormulario } from "../shared/pagina.create.interface.js";
import { IPaginaHTML } from "../shared/pagina.interface.js";
import { IRepositorio } from "../shared/repositorio.interface.js";
import { Contato } from "./contato.model.js";
import { ContatoRepositoryLocalStorage } from "./contato.repository.local-storage.js";

class ContatoPaginaEdicao implements IPaginaHTML, IPaginaFormulario {
  private txtNome: HTMLInputElement;
  private txtEmail: HTMLInputElement;
  private txtTelefone: HTMLInputElement;
  private txtEmpresa: HTMLInputElement;
  private txtCargo: HTMLInputElement;
  private btnEditar: HTMLButtonElement;
  private btnExibir: HTMLButtonElement;

  constructor(private repositorioContatos: IRepositorio<Contato>) {
    this.configurarElementos();
  }

  configurarElementos(): void {
    this.txtNome = document.getElementById("txtEditarNome") as HTMLInputElement;
    this.txtEmail = document.getElementById(
      "txtEditarEmail"
    ) as HTMLInputElement;
    this.txtTelefone = document.getElementById(
      "txtEditarTelefone"
    ) as HTMLInputElement;
    this.txtEmpresa = document.getElementById(
      "txtEditarEmpresa"
    ) as HTMLInputElement;
    this.txtCargo = document.getElementById(
      "txtEditarCargo"
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

    let contatoSelecionada =
      this.repositorioContatos.contatos[Number(selectedRow.value) - 1];
    contatoSelecionada.nome = this.txtNome.value;
    contatoSelecionada.email = this.txtEmail.value;
    contatoSelecionada.telefone = this.txtTelefone.value;
    contatoSelecionada.empresa = this.txtEmpresa.value;
    contatoSelecionada.cargo = this.txtCargo.value;

    // const prioridade = this.selectEditarPrioridade.value as Prioridade;

    // const novaContato = new Contato(this.txtEditarDescricao.value, prioridade);

    this.repositorioContatos.editar(contatoSelecionada);

    console.log(
      this.repositorioContatos.contatos[Number(selectedRow.value) - 1]
    );
    console.log(contatoSelecionada);

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

    let contatoSelecionada =
      this.repositorioContatos.contatos[Number(selectedRow.value) - 1];
    this.txtNome.value = contatoSelecionada.nome;
    this.txtEmail.value = contatoSelecionada.email;
    this.txtTelefone.value = contatoSelecionada.telefone;
    this.txtEmpresa.value = contatoSelecionada.empresa;
    this.txtCargo.value = contatoSelecionada.cargo;

    // const prioridade = this.selectEditarPrioridade.value as Prioridade;
  }
}

new ContatoPaginaEdicao(new ContatoRepositoryLocalStorage());
