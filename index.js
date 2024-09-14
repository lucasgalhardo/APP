const { select } = require('@inquirer/prompts');

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
                console.log('Cadastrando meta...');
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