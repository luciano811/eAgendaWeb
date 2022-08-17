import { IRepositorioSerializavel } from "../shared/repositorio-serializavel.interface";
import { IRepositorio } from "../shared/repositorio.interface";
import { Contato } from "./contato.model";

export class ContatoRepositoryLocalStorage
  implements IRepositorio<Contato>, IRepositorioSerializavel
{
  private readonly localStorage: Storage;

  public readonly contatos: Contato[];

  constructor() {
    this.localStorage = window.localStorage;

    this.contatos = this.selecionarTodos();
  }
  //parar  o bug abaixo
  tarefas: any[];

  public gravar(): void {
    const contatosJsonString = JSON.stringify(this.contatos);

    this.localStorage.setItem("contatos", contatosJsonString);
  }

  public inserir(registro: Contato): void {
    this.contatos.push(registro);
    this.gravar();
  }

  public editar(registro: Contato): void {
    let contatoIndex = this.contatos.findIndex(function (contato) {
      return contato.id == registro.id;
    });

    if (contatoIndex > -1) {
      this.contatos[contatoIndex] = registro;
    }

    this.gravar();
  }

  public remover(registro: Contato): void {
    var reg = this.contatos.findIndex((x) => x.id == registro.id);

    this.contatos.splice(reg, 1);

    this.gravar();
    console.log("noremover");
    console.log(registro.id);
  }

  public selecionarTodos(): Contato[] {
    const dados = this.localStorage.getItem("contatos");

    if (!dados) return [];

    return JSON.parse(dados);
  }
}
