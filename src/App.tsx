import { useState } from 'react'
import lista_de_frases from "./../data/frases.json"
import swal from 'sweetalert';
import './App.css'



function App() {
  const [randomFrase, setRandomFrase] = useState("");
  const [oldFrase, setOldFrase] = useState("");
  const [hora, setHora] = useState("00");
  const [minuto, setMinuto] = useState("00");
  const [segundo, setSegundo] = useState("00");

  const [mainTitle, setMainTitle] = useState("Você tem uma nova mensagem");

  const oldFraseValue = localStorage.getItem('frase')?.valueOf();

  setInterval(function time() {
    const date = new Date();
    const h = date.getHours();
    const mm = date.getMinutes();
    const s = date.getSeconds();

    setHora(h.toString());
    setMinuto(mm.toString());
    setSegundo(s.toString());

  })




  function show() {

    //Gera número aleatório.
    const random = Math.round(Math.random() * 100);

    setRandomFrase(lista_de_frases.frases[random]);
    localStorage.setItem('frase', lista_de_frases.frases[random]);
  }

  function setFadeInAnimation() {
    const frase = document.getElementById('main-content');
    if (frase != null) {
      frase.style.animation = 'fromBottom .8s backwards';
      frase.style.animationDelay = '.8s';
    }
  }

  function handleClick() {

    //Atualiza o mainTitle
    setMainTitle("A sua frase do dia é:");

    //Remove elemento da imagem e cria animação para o elemento <p> que irá surgir após o clique.
    document.getElementById('img-box')?.remove();
    setFadeInAnimation();

    //Salva o dia atual no local storage
    const novaData = new Date();
    if (localStorage.getItem('diaAtual')?.valueOf() === null || localStorage.getItem('diaAtual')?.valueOf() === '' || localStorage.getItem('diaAtual')?.valueOf() === undefined) {
      localStorage.setItem('diaAtual', novaData.getDate().toString());
    }

    const diaSalvoAnterior = localStorage.getItem('diaAtual')?.valueOf();
    const diaAtual = novaData.getDate().toString();

    //Compara a data atual com a dia salvo no Local Storage anteriormente
    if (diaAtual === diaSalvoAnterior) {

      //Gera um alerta na tela informando o status atual da sessão para o usuário.
      if (localStorage.getItem('frase') !== null) {
        setOldFrase(oldFraseValue!);
        swal({
          title: "Ops, a sua frase do dia já foi revelada..volte amanhã para uma nova mensagem!",
          icon: 'info'
        });
        return;
      }
    } else {
      localStorage.setItem('diaAtual', novaData.getDate().toString());
    }

    show();
  }


  return (
    <>
      <div className='mainDiv'>
        <strong><h1>{mainTitle}</h1></strong>
        <div id='img-box'>
          <img id='notification-img' src="./../icons8-new-message-65.png" alt="" />
        </div>
        <section className='content-section'><p id='main-content'>{randomFrase == '' ? oldFrase : randomFrase}</p></section>
        <section className='btn-section'>
          <button onClick={handleClick} onDrag={handleClick}>Abrir mensagem</button>
          <button id='whats-btn'><a href={`https://api.whatsapp.com/send/?text=${randomFrase === '' ? 'Venha conhecer o app de frases no link https://' : `Vi essa frase e lembrei de você: ${randomFrase}`}+&type=phone_number&app_absent=0`}><img id='whats-logo' src="./icons8-whatsapp-100.png" alt="" /></a></button>
        </section>
        <section id='horas'>
          <p id='hora'>{hora.padStart(2, "0")}</p>
          <p id='divisor-hora'>:</p>
          <p id='minutos'>{minuto.padStart(2, "0")}</p>
          <p id='divisor-hora'>:</p>
          <p id='segundos'>{segundo.padStart(2, "0")}</p>
        </section>
      </div>
    </>
  )
}

export default App
