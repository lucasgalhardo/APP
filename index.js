const { select, input, checkbox } = require('@inquirer/prompts');

let metas = [];

const cadastrarMeta = async () => {
    const meta = await input({ message: 'Digite a meta:'});

    if (meta.length == 0) {
        console.log('A meta não pode ser vazia.');
        return;
    }

    metas.push({ value: meta, checked: false});

}

const listarMetas = async () => {
    const respostas = await checkbox( {
        message: "Use as Setas para mudar de meta, o Espaço para marcar ou desmarcar e o Enter para finalzar essa etapa",
        choices: [...metas],
        instructions: false
    })

    metas.forEach((m) => {
        m.checked = false;
    })

    if (respostas.length == 0) {
        console.log("Nenhuma meta selecionada!");
        return;
    }

    respostas.forEach((resposta) => {
        const meta = metas.find((m) => {
            return m.value == resposta;
        })    

        meta.checked = true;
    })

    console.log('Meta(s) marcadas como concluída(s)');
}

const metasRealizadas = async () => {
    const realizadas = metas.filter((meta) => {
        return meta.checked;
    })

    if (realizadas.length == 0) {
        console.log("Não existem metas realizadas!"); 
        return;
    }

    await select({
        message: "Metas realizadas: " + realizadas.length,
        choices: [...realizadas]
    })
}

const metasAbertas = async () => {
    const abertas = metas.filter((meta) => {
        return !meta.checked;
    })

    if (abertas.length == 0) {
        console.log("Não existem metas abertas!");
        return;
    }

    await select({
        message: "Metas abertas",
        choices: [...abertas]
    })
}

const Start = async () =>
{
    while (true) 
    {
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
            default:
            case "sair":    
                console.log('Saindo...');
                return;
        }
    }
}

Start();