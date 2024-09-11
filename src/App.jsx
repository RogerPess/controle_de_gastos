import "./App.css";
import Button from "./components/Button";
import MyForm from "./components/MyForm";
import { useState, useEffect } from "react";
import { v4 } from "uuid";

const url = "http://localhost:3000/contasAPagar";

function App() {
  const [despesas, setDespesas] = useState([]);

  useEffect(() => {
    async function getData() {
      const res = await fetch(url);

      const data = await res.json();

      setDespesas(data);
    }

    getData();
  }, []);

  // envio de dados

  const handleDespesas = async (e) => {
    e.preventDefault();
    const despesa = {
      id: v4(),
      despesa: e.target.despesa.value,
      valor: e.target.valor.value,
      status: e.target.status.value,
      mes: e.target.mes.value,
    };

    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(despesa),
    });

    setDespesas((anterior) => [...anterior, despesa]);
  };

  function pagar(index) {
    const item = despesas[index];
    const itemId = item.id;
    const novasDespesas = [...despesas];
    novasDespesas[index].status = "pago";
    setDespesas(novasDespesas);

    fetch(`${url}/${itemId}`, {
      method: "PUT", // ou 'PATCH'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...item, status: "pago" }),

    });
  }

  function verificarStatusERetornarCor(status) {
    if (status == "pendente") {
      return "orange";
    }
    if (status == "pago") {
      return "green";
    }
  }

  function extornar(index) {
    const item = despesas[index];
    const itemId = item.id;
    const novasDespesas = [...despesas];
    novasDespesas[index].status = "pendente";
    setDespesas(novasDespesas);

    fetch(`${url}/${itemId}`, {
      method: "PUT", // ou 'PATCH'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...item, status: "pendente" }),

    });
  }

  function deletar(index) {
    const item = despesas[index];
    const itemId = item.id;
    const restantes = [...despesas];
    restantes.splice(index, 1);
    setDespesas(restantes);

    fetch(`${url}/${itemId}`, {
      method: "DELETE",
    });

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
