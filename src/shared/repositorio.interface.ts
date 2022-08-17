import { EntidadeBase } from "./entidade.model";

export interface IRepositorio<T extends EntidadeBase> {
  tarefas: any[];
  contatos: any[];
  inserir(registro: T): void;
  editar(registro: T): void;
  remover(registro: T): void;
  selecionarTodos(): T[];
}
