import { IPaginaFormulario } from "../shared/pagina.create.interface.js";
import { IPaginaHTML } from "../shared/pagina.interface.js";
import { IRepositorio } from "../shared/repositorio.interface.js";
import { Contato } from "./contato.model.js";
import { ContatoRepositoryLocalStorage } from "./contato.repository.local-storage.js";

class ContatoPaginaCadastro implements IPaginaHTML, IPaginaFormulario {
  private txtNome: HTMLInputElement;
  private txtEmail: HTMLInputElement;
  private txtTelefone: HTMLInputElement;
  private txtEmpresa: HTMLInputElement;
  private txtCargo: HTMLInputElement;
  private btnSalvar: HTMLButtonElement;

  constructor(private repositorioContatos: IRepositorio<Contato>) {
    this.configurarElementos();
  }

  configurarElementos(): void {
    this.txtNome = document.getElementById("txtNome") as HTMLInputElement;
    this.txtEmail = document.getElementById("txtEmail") as HTMLInputElement;
    this.txtTelefone = document.getElementById(
      "txtTelefone"
    ) as HTMLInputElement;
    this.txtEmpresa = document.getElementById("txtEmpresa") as HTMLInputElement;
    this.txtCargo = document.getElementById("txtCargo") as HTMLInputElement;

    this.btnSalvar = document.getElementById(
      "btnSalvarContato"
    ) as HTMLButtonElement;

    // operador discard _
    this.btnSalvar.addEventListener("click", (_evt) => this.gravarRegistros());
  }

  gravarRegistros(): void {
    if (this.txtNome.value === "") {
      alert("Preencha o campo nome");
      return;
    } else if (this.txtEmail.value === "") {
      alert("Preencha o campo email");
      return;
    } else if (this.txtTelefone.value === "") {
      alert("Preencha o campo telefone");
      return;
    } else if (this.txtEmpresa.value === "") {
      alert("Preencha o campo empresa");
      return;
    } else if (this.txtCargo.value === "") {
      alert("Preencha o campo cargo");
      return;
    }

    const novaContato = new Contato(
      this.txtNome.value,
      this.txtEmail.value,
      this.txtTelefone.value,
      this.txtEmpresa.value,
      this.txtCargo.value
    );

    this.repositorioContatos.inserir(novaContato);

    // método para redirecionar usuario
    window.location.href = "contato.list.html";
  }
}

new ContatoPaginaCadastro(new ContatoRepositoryLocalStorage());
