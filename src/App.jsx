import "./App.css";
import Button from "./components/Button";
import MyForm from "./components/MyForm";
import { useState, useEffect } from "react";
import { v4 } from "uuid";

// const url = "http://localhost:3000/contasAPagar";

function App() {
  const [despesas, setDespesas] = useState([]);

  useEffect(() => {
    const storedDespesas = localStorage.getItem("despesas");
    if (storedDespesas) {
      setDespesas(JSON.parse(storedDespesas));
    }
  }, []);

  // envio de dados

  const handleDespesas = (e) => {
    e.preventDefault();
    const despesa = {
      id: v4(),
      despesa: e.target.despesa.value,
      valor: e.target.valor.value,
      status: e.target.status.value,
      mes: e.target.mes.value,
    };

    setDespesas([...despesas, despesa]);
    localStorage.setItem("despesas", JSON.stringify([...despesas, despesa]));
  };

  function pagar(index) {
    const item = despesas[index];
    const novasDespesas = [...despesas];
    novasDespesas[index].status = "pago";
    setDespesas(novasDespesas);
    localStorage.setItem('despesas', JSON.stringify(novasDespesas));
  }

  function verificarStatusERetornarCor(status) {
    switch (status) {
      case "pendente":
        return "orange";
      case "pago":
        return "green";
      default:
        return "gray";
    }
  }

  function extornar(index) {
    const item = despesas[index]; 
    const novasDespesas = [...despesas];
    novasDespesas[index].status = "pendente";
    setDespesas(novasDespesas);
    localStorage.setItem('despesas', JSON.stringify(novasDespesas));
  }

  function deletar(index) {
    const item = despesas[index];
    const restantes = [...despesas];
    const novasDespesas = [...despesas];

    restantes.splice(index, 1);
    setDespesas(restantes);
    localStorage.removeItem('despesas', JSON.stringify(novasDespesas));
  }

  return (
    <>
      <div className="header-container">
        <h1>Controle Mensal</h1>
      </div>
      <MyForm handleDespesas={handleDespesas} />
      <div className="despesas-container">
        <ul>
          {despesas.map((item, index) => (
            <>
              <div className="resposta-form">
                <div
                  style={{ color: verificarStatusERetornarCor(item.status) }}
                  className="resultados"
                >
                  <li key={despesas.id}>Nome da despesa - {item.despesa}</li>
                  <li key={despesas.id}>Valor - R$ {item.valor}</li>
                  <li key={despesas.id}>Status - {item.status}</li>
                  <li key={despesas.id}>Mês - {item.mes}</li>
                </div>
                <div className="botoes">
                  <Button
                    onclick={() => pagar(index)}
                    className="pago"
                    name="Pago"
                  />
                  <Button
                    onclick={() => extornar(index)}
                    className="pendente"
                    name={"Pendente"}
                  />
                  <Button
                    onclick={() => deletar(index)}
                    className="excluir"
                    name={"Excluir"}
                  />
                </div>
              </div>
            </>
          ))}
        </ul>
      </div>
    </>
  );
}

export default App;
