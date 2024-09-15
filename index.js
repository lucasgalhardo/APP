const { select, input, checkbox } = require('@inquirer/prompts');

let mensagem = "Bem-vindo ao app de metas";
let metas = [];

const cadastrarMeta = async () => {
    const meta = await input({ message: 'Digite a meta:'});

    if (meta.length == 0) {
        mensagem = 'A meta não pode ser vazia.';
        return;
    }

    metas.push({ value: meta, checked: false});

    mensagem = "Meta cadastrada com sucesso!";
}

const listarMetas = async () => {
    if (metas.length == 0) {
        mensagem = "Não existem metas cadastradas!";
        return;
    }

    const respostas = await checkbox( {
        message: "Use as Setas para mudar de meta, o Espaço para marcar ou desmarcar e o Enter para finalzar essa etapa",
        choices: [...metas],
        instructions: false
    })

    metas.forEach((m) => {
        m.checked = false;
    })

    if (respostas.length == 0) {
        mensagem = "Nenhuma meta selecionada!";
        return;
    }

    respostas.forEach((resposta) => {
        const meta = metas.find((m) => {
            return m.value == resposta;
        })    

        meta.checked = true;
    })

    mensagem = "Meta(s) marcada(s) como concluída(s)";
}

const metasRealizadas = async () => {
    const realizadas = metas.filter((meta) => {
        return meta.checked;
    })

    if (realizadas.length == 0) {
        mensagem = "Não existem metas realizadas!"; 
        return;
    }

    await select({
        message: "Meta(s) realizada(s): " + realizadas.length,
        choices: [...realizadas]
    })
}

const metasAbertas = async () => {
    const abertas = metas.filter((meta) => {
        return !meta.checked;
    })

    if (abertas.length == 0) {
        mensagem = "Não existe(m) meta(s) aberta(s)!";
        return;
    }

    await select({
        message: "Meta(s) aberta(s)",
        choices: [...abertas]
    })
}

const removerMetas = async () => {
    if (metas.length == 0) {
        mensagem = "Não existem metas cadastradas!";
        return;
    }

    const metasDesmarcadas = metas.map((meta) => {
        return {value: meta.value, checked: false}
    })
    
    const itensADeletar = await checkbox( {
        message: "Selecione item para remover",
        choices: [...metasDesmarcadas],
        instructions: false
    })

    if (itensADeletar.length == 0) {
        mensagem = "Nenhuma meta selecionada!";
        return;
    }

    itensADeletar.forEach((item) => {
        metas = metas.filter((meta) => {
            return meta.value != item;
        })    
    })

    mensagem = "Meta(s) removida(s) com sucesso!";
}

const mostrarMensagem = () => {
    console.clear();

    if (mensagem != "")
    {
        console.log(mensagem);
        console.log("");
        mensagem = "";
    }
}

const Start = async () =>
{
    while (true) 
    {
        mostrarMensagem();
        const opcao = await select({
            message: "Menu >",
            choices: 
            [
                {
                    name: "Cadastrar meta",
                    value: "cadastrar"                    
                },
                {
                    name: "Listar metas",
                    value: "listar"
                },
                {
                    name: "Metas realizadas",
                    value: "realizadas"
                },
                {
                    name: "Metas abertas",
                    value: "abertas"
                },
                {
                    name: "Remover metas",
                    value: "remover"
                },
                {
                    name: "Sair",
                    value: "sair"
                }
            ]
        });

        switch (opcao)
        {
            case "cadastrar":
                await cadastrarMeta();
                break;
            case "listar":
                await listarMetas();
                break;    
            case "realizadas":
                await metasRealizadas();
                break;
            case "abertas":
                await metasAbertas();
                break;
            case "remover":
                await removerMetas();
                break;
            default:
            case "sair":    
                console.log('Saindo...');
                return;
        }
    }
}

Start();