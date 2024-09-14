const { select, input, checkbox } = require('@inquirer/prompts');

let metas = [];

const CadastrarMeta = async () => {
    const meta = await input({ message: 'Digite a meta:'});

    if (meta.length == 0) {
        console.log('A meta não pode ser vazia.');
        return;
    }

    metas.push({ value: meta, checked: false});

}

const ListarMetas = async () => {
    const respostas = await checkbox( {
        message: "Use as Setas para mudar de meta, o Espaço para marcar ou desmarcar e o Enter para finalzar essa etapa",
        choices: [...metas],
        instructions: false
    })

    if (respostas.length == 0) {
        console.log("Nenhuma meta selecionada!");
        return;
    }

    metas.forEach((m) => {
        m.checked = false;
    })

    respostas.forEach((resposta) => {
        const meta = metas.find((m) => {
            return m.value == resposta;
        })    

        meta.checked = true;
    })

    console.log('Meta(s) marcadas como concluída(s)');
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
                    name: "Sair",
                    value: "sair"
                }
            ]
        });

        switch (opcao)
        {
            case "cadastrar":
                await CadastrarMeta();
                break;
            case "listar":
                await ListarMetas();
                break;        
            default:
            case "sair":    
                console.log('Saindo...');
                return;
        }
    }
}

Start();