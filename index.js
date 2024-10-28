class Pessoa {
    constructor(identificador, nomeCompleto, anos, situacao) {
        this.identificador = identificador;
        this.nomeCompleto = nomeCompleto;
        this.anos = anos;
        this.situacao = situacao;
    }
}

class FilaEspera {
    constructor() {
        this.pessoasNaFila = [];
    }

    enfileirar(pessoa) {
        this.pessoasNaFila.push(pessoa);
    }

    desenfileirar() {
        return this.pessoasNaFila.shift();
    }

    listarFila() {
        return this.pessoasNaFila;
    }
}

class PilhaDocumentos {
    constructor() {
        this.documentos = [];
    }

    adicionarDocumento(documento) {
        this.documentos.push(documento);
    }

    acessarDocumentoRecente() {
        return this.documentos.pop(); 
    }

    listarDocumentos() {
        return this.documentos;
    }
}

class NoPaciente {
    constructor(pessoa) {
        this.pessoa = pessoa;
        this.esquerda = null;
        this.direita = null;
    }
}

class SistemaInternacao {
    constructor() {
        this.raiz = null;
    }

    registrar(pessoa) {
        const novoNo = new NoPaciente(pessoa);
        if (this.raiz === null) {
            this.raiz = novoNo;
        } else {
            this.adicionarNo(this.raiz, novoNo);
        }
    }

    adicionarNo(noAtual, novoNo) {
        if (novoNo.pessoa.identificador < noAtual.pessoa.identificador) {
            if (noAtual.esquerda === null) {
                noAtual.esquerda = novoNo;
            } else {
                this.adicionarNo(noAtual.esquerda, novoNo);
            }
        } else {
            if (noAtual.direita === null) {
                noAtual.direita = novoNo;
            } else {
                this.adicionarNo(noAtual.direita, novoNo);
            }
        }
    }

    localizar(identificador) {
        return this.procurarNo(this.raiz, identificador);
    }

    procurarNo(noAtual, identificador) {
        if (noAtual === null) {
            return null;
        } else if (identificador < noAtual.pessoa.identificador) {
            return this.procurarNo(noAtual.esquerda, identificador);
        } else if (identificador > noAtual.pessoa.identificador) {
            return this.procurarNo(noAtual.direita, identificador);
        } else {
            return noAtual.pessoa;
        }
    }
}

function ordenarDocumentos(arr, chave) {
    if (arr.length <= 1) {
        return arr;
    }

    const pivo = arr[arr.length - 1];
    const menores = [];
    const maiores = [];

    for (const item of arr.slice(0, arr.length - 1)) {
        if (item[chave] < pivo[chave]) {
            menores.push(item);
        } else {
            maiores.push(item);
        }
    }

    return [...ordenarDocumentos(menores, chave), pivo, ...ordenarDocumentos(maiores, chave)];
}

class GestaoHospitalar {
    constructor() {
        this.filaEspera = new FilaEspera();
        this.pilhaDocumentos = new PilhaDocumentos();
        this.sistemaInternacao = new SistemaInternacao();
    }

    colocarPessoaNaFila(pessoa) {
        this.filaEspera.enfileirar(pessoa);
    }

    atenderPessoaNaFila() {
        const pessoaAtendida = this.filaEspera.desenfileirar();
        this.registrarDocumento(pessoaAtendida); 
    }

    registrarDocumento(pessoa) {
        this.pilhaDocumentos.adicionarDocumento(pessoa);
    }

    internarPessoa(pessoa) {
        this.sistemaInternacao.registrar(pessoa);
    }

    buscarPessoaInternada(identificador) {
        return this.sistemaInternacao.localizar(identificador);
    }

    ordenarDocumentosPor(chave) {
        const documentos = this.pilhaDocumentos.listarDocumentos();
        return ordenarDocumentos(documentos, chave);
    }
}


const hospital = new GestaoHospitalar();

const pessoa1 = new Pessoa(1, 'Carlos Silva', 25, 'aguardando');
const pessoa2 = new Pessoa(2, 'Julia Santos', 50, 'aguardando');
const pessoa3 = new Pessoa(3, 'Fernanda Costa', 20, 'internado');

hospital.colocarPessoaNaFila(pessoa1);
hospital.colocarPessoaNaFila(pessoa2);
hospital.atenderPessoaNaFila();  

hospital.internarPessoa(pessoa3);  

console.log(hospital.ordenarDocumentosPor('nomeCompleto')); 