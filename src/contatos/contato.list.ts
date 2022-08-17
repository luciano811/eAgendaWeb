import { IPaginaHTML } from "../shared/pagina.interface.js";
import { IPaginaListagem } from "../shared/pagina.list.interface.js";
import { IRepositorio } from "../shared/repositorio.interface.js";
import { Contato } from "./contato.model.js";
import { ContatoRepositoryLocalStorage } from "./contato.repository.local-storage.js";

class ContatoPaginaListagem implements IPaginaHTML, IPaginaListagem {
  public tabela: HTMLTableElement;

  constructor(private repositiorioContatos: IRepositorio<Contato>) {
    this.configurarElementos();
    this.atualizarTabela();
  }

  configurarElementos(): void {
    this.tabela = document.getElementById("tabela") as HTMLTableElement;
  }

  atualizarTabela(): void {
    const contatos = this.repositiorioContatos.selecionarTodos();

    let corpoTabela = this.tabela.getElementsByTagName("tbody")[0];

    contatos.forEach((contato) => {
      const novaLinha = corpoTabela.insertRow();

      novaLinha.className = "linhas";

      Object.values(contato).forEach((valor: any) => {
        const novaCelula = novaLinha.insertCell();

        novaCelula.innerText = valor;
      });
    });
  }
}

new ContatoPaginaListagem(new ContatoRepositoryLocalStorage());
