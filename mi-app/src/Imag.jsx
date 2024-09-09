import ag from './assets/imag/ag.png';
function Imag(){
    return(
        <center>
        <img src={ag} style={style.img} alt="ag.png"/>
        </center>
    );
}

export default Imag

const style={
    img:{   textAlign: 'center',
        width:'80px',
        height:'auto'

    }
}