const CepInputC = document.getElementById('CepInput');
const BuscarBtnB = document.getElementById('BuscarBtn');
const ResultadoDiv = document.getElementById('Resultado');

CepInputC.addEventListener('input', (e) =>{ e.target.value = e.target.value
    .replace(/\D/g,'')
    .replace(/^(\d{5})(\d)/, '$1-$2')
});

BuscarBtnB.addEventListener('click', buscarCep);

async function buscarCep() {
    const cep = CepInputC.value.replace(/\D/g, '');

    if (cep.length !== 8) {
        ResultadoDiv.innerHTML = '<p style="color: red; "> Digite um CEP válido com 8 números </p>';
        return;
       };

     ResultadoDiv.innerHTML = "<p> Buscando...</p>";
    
     try {
            const response = await fetch (`https://viacep.com.br/ws/${cep}/json/`);
            const data = await response.json();

         if (data.erro) {
            ResultadoDiv.innerHTML = '<p style="color: red;"> CEP não encontrado</p>';
         return;
         }
         
            else { ResultadoDiv.innerHTML = `
            <h3>Endereço Encontrado:</h3> 
            <p><strong>Rua:</strong> ${data.logradouro}</p> 
            <p><strong>Bairro:</strong> ${data.bairro}</p>
            <p><strong>Cidade:</strong> ${data.localidade} - ${data.uf}</p>
            `
            }

        }
         catch (error) {
                              ResultadoDiv.innerHTML = '<p style="color: red;"> Erro ao buscar o CEP. Tente Novamente. </p>';
                       }
 } 
