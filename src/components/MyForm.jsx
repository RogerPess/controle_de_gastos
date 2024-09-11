import "./MyForm.css";
import React, { useState } from "react";

const MyForm = ({handleDespesas}) => {

  return (
    <div className="form-container">
      <form onSubmit={handleDespesas} className="form-control">
        <div className="labels-form">
          <div className="despesas">
            <label>Despesa:</label>
            <input
              name="despesa"
              type="text"
              className="input-valor"
              placeholder="Digite o nome da despesa"
              required
            />
          </div>

          <div className="valor">
            <label>Valor:</label>
            <input
              name="valor"
              type="text"
              className="input-valor"
              placeholder="Digite o valor"
              required
            />
          </div>

          <div className="status">
            <label>Status</label>
            <select name="status" className="select-valor">
              <option value="pendente">Pendente</option>
              <option value="pago">Pago</option>
            </select>
          </div>

          <div className="mes-form">
            <label>Mês</label>
            <select name="mes" className="select-valor">
              <option>Janeiro</option>
              <option>Fevereiro</option>
              <option>Março</option>
              <option>Abril</option>
              <option>Maio</option>
              <option>Junho</option>
              <option>Julho</option>
              <option>Agosto</option>
              <option>Setembro</option>
              <option>Outubro</option>
              <option>Novembro</option>
              <option>Dezembro</option>
            </select>
          </div>
        </div>
        <button type="submit" className="enviar-form">Enviar</button>
      </form>
    </div>
  );
};

export default MyForm;
