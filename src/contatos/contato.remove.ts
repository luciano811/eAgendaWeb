import { IPaginaFormulario } from "../shared/pagina.create.interface.js";
import { IPaginaHTML } from "../shared/pagina.interface.js";
import { IRepositorio } from "../shared/repositorio.interface.js";
import { Contato } from "./contato.model.js";
import { ContatoRepositoryLocalStorage } from "./contato.repository.local-storage.js";

class ContatoPaginaExclusao implements IPaginaHTML, IPaginaFormulario {
  private txtNome: HTMLInputElement;
  private txtEmail: HTMLInputElement;
  private txtTelefone: HTMLInputElement;
  private txtEmpresa: HTMLInputElement;
  private txtCargo: HTMLInputElement;
  private btnEditar: HTMLButtonElement;
  private btnRemover: HTMLButtonElement;
  private tabela: HTMLTableElement;

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

    const novoContato = new Contato(
      this.txtNome.value,
      this.txtEmail.value,
      this.txtTelefone.value,
      this.txtEmpresa.value,
      this.txtCargo.value
    );

    console.log(novoContato.id);
    this.repositorioContatos.remover(novoContato);

    // método para redirecionar usuario
    // window.location.href = "contato.list.html";
  }

  removerRegistro(): void {
    let selectedRow = document.getElementById(
      "selectedRow"
    ) as HTMLInputElement;
    //this.repositorioContatos.contatos.splice(Number(selectedRow.value), 1);
    this.repositorioContatos.remover(
      this.repositorioContatos.contatos[Number(selectedRow.value) - 1]
    );
    console.log(selectedRow.value);
    console.log(this.repositorioContatos.contatos);

    let tabela = <HTMLTableElement>document.getElementById("tabela");

    //tabela.deleteRow(Number(selectedRow.value));
    window.location.reload();
  }
}

new ContatoPaginaExclusao(new ContatoRepositoryLocalStorage());
