const { select, input } = require('@inquirer/prompts');

let metas = [];

const CadastrarMeta = async () => {
    const meta = await input({ message: 'Digite a meta:'});

    if (meta.length == 0) {
        console.log('A meta não pode ser vazia.');
        return;
    }

    metas.push({ value: meta, checked: false});

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
                console.log(metas);
                break;
            case "listar":
                console.log('Listando metas...');
                break;        
            default:
            case "sair":    
                console.log('Saindo...');
                return;
        }
    }
}

Start();