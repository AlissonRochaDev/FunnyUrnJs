let seuVotoPara = document.querySelector('.pt-1-1 span');
let cargo = document.querySelector('.pt-1-2 span');
let numeros = document.querySelector('.pt-1-3');
let descricao = document.querySelector('.pt-1-4');

let lateral = document.querySelector('.pt-1-right');

let aviso = document.querySelector('.pt-2');

let etapaAtual = 0;
let numero = '';
let votoBranco = false;
let votos = [];

function iniciarEtapa(){
	let etapa = etapas[etapaAtual];
	let numeroHTML = '';
	numero = '';
	votoBranco = false;

	for(let i=0;i<etapa.numeros;i++){
		if(i === 0){
			numeroHTML += '<div class="numero pisca"></div>';
		}else{
			numeroHTML += '<div class="numero"></div>';
		}
	}

	seuVotoPara.style.display = 'none';
	cargo.innerHTML = etapa.titulo;
	descricao.innerHTML = '';
	aviso.style.display = 'none';
	lateral.innerHTML = '';
	numeros.innerHTML = numeroHTML;
}

function atualizaInterface(){
	// alert("Digitação de VOTO realizada com Sucesso!");

	// console.log("Atualizando Interface!");
	// console.log(numero);

	let etapa = etapas[etapaAtual];
	let candidato = etapa.candidatos.filter((item)=>{
		if(item.numero === numero){
			return true;
		}else{
			return false;
		}
	});

	if(candidato.length > 0){
		candidato = candidato[0];
		seuVotoPara.style.display = 'block';
		aviso.style.display = 'block';
		descricao.innerHTML = `Nome: ${candidato.nome}<br/>Partido: ${candidato.partido}<br/>`;

		// Variável Arry de fotos do candidato
		let fotosHTML = '';
		for(let i in candidato.fotos){
			fotosHTML += `<div class="pt-1-img"><img src="${candidato.fotos[i].url}" alt=""><span>${candidato.fotos[i].legenda}.</span></div>`;
		}

		lateral.innerHTML = fotosHTML;

	}else{
		seuVotoPara.style.display = 'block';
		aviso.style.display = 'block';
		descricao.innerHTML = '<div class="aviso-grande pisca">VOTO NULO!</div>';
	}
}

function clicou(n){
	// alert("Clicou em "+n);

	let elNumero = document.querySelector('.numero.pisca');

	if(elNumero !== null){
		elNumero.innerHTML = n;
		numero = `${numero}${n}`;

		elNumero.classList.remove('pisca');
		if(elNumero.nextElementSibling !== null){
			elNumero.nextElementSibling.classList.add('pisca');
		}else{
			atualizaInterface();
		}
	}
}

function branco(){
	// alert("Clicou em BRANCO!");

	if(numero === ''){
		votoBranco = true;
		seuVotoPara.style.display = 'block';
		aviso.style.display = 'block';
		numeros.innerHTML = '';
		descricao.innerHTML = '<div class="aviso-grande pisca">VOTO EM BRANCO!</div>';
	}else{
		alert("Para votar em BRANCO, não pode ter digitado nenhum número!");
	}
}

function corrige(){
	// alert("Corrigido com Sucesso!");

	iniciarEtapa();
}

function confirma(){
	// alert("Voto CONFIRMADO com Sucesso!");

	let etapa = etapas[etapaAtual];
	let votoConfirmado = false;

	if(votoBranco === true){
		votoConfirmado = true;
		// console.log("Confirmado como BRANCO!");
		votos.push({
			etapa: etapas[etapaAtual].titulo,
			voto: 'branco'
		});
	}else if(numero.length === etapa.numeros){
		votoConfirmado = true;
		// console.log("Confirmado como " +numero);
		votos.push({
			etapa: etapas[etapaAtual].titulo,
			voto: numero
		});
	}

	if(votoConfirmado){
		etapaAtual++;
		// console.log(etapas[etapaAtual]);
		if(etapas[etapaAtual] !== undefined){
			iniciarEtapa();
		}else{
			// console.log("FIM!");

			document.querySelector('.tela').innerHTML = '<div class="aviso-enorme pisca">FIM</div>';
			console.log(votos);
		}
	}
}

iniciarEtapa();