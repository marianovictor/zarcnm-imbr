import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

const Form3 = () => {
  const [formData, setFormData] = useState({
    dataInicial: "2021-01-17",
    dataFinal: "2024-05-14",
    declividadeMedia: 60,
    plantioContorno: 0,
    terraceamento: 0,
    indices: [
      {
        satelite: "Sentinel",
        coordenada: "POINT(40.71727401 -74.00898606)",
        data: "2022-08-29",
        ndvi: 0.3342,
        ndti: 0.1342,
      },
    ],
    interpretacoesCultura: [
      {
        cultura: "Soja (grão)",
        dataInicio: "2023-10-01",
        dataFim: "2024-02-01",
        coberturaSolo: 40,
      },
    ],
    interpretacoesManejo: [
      {
        data: "2021-01-28",
        operacao: "Revolvimento do solo",
        tipoOperacao: "Aração",
      },
    ],
  });

  const handleChange = (e, field) => {
    const { value } = e.target;
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleArrayChange = (e, index, arrayField, field) => {
    const { value } = e.target;
    setFormData((prev) => {
      const updatedArray = [...prev[arrayField]];
      updatedArray[index][field] = value;
      return { ...prev, [arrayField]: updatedArray };
    });
  };

  const addEntry = (arrayField, defaultValues) => {
    setFormData((prev) => ({
      ...prev,
      [arrayField]: [...prev[arrayField], defaultValues],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/v1/endpoint3", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("Dados enviados com sucesso!");
      } else {
        alert("Erro ao enviar os dados.");
      }
    } catch (error) {
      console.error("Erro ao enviar os dados:", error);
    }
  };

  return (
    <div className="container-fluid my-4">
      <h2 className="text-center mb-4">Dados de Monitoramento</h2>
      <h6 className="text-danger text-center">
        Informações obrigatórias estão marcadas com *
      </h6>
      <form onSubmit={handleSubmit}>
        <div className="card mb-4 border-0">
          <div className="card-header text-white" style={{ backgroundColor: "#0b4809" }}>
            <h3>Dados de Sensoriamento Remoto</h3>
          </div>
          <div className="card-body">

            <div className="md-3" style={{ marginBottom: "1rem" }}>
              <label className="form-label">Data Início do Monitoramento *</label>
              <input
                type="date"
                className="form-control"
                value={formData.dataInicial}
                onChange={(e) => handleChange(e, "dataInicial")}
                required
              />
            </div>
            <div className="md-3" style={{ marginBottom: "1rem" }}>
              <label className="form-label">Data Término do Monitoramento *</label>
              <input
                type="date"
                className="form-control"
                value={formData.dataFinal}
                onChange={(e) => handleChange(e, "dataFinal")}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">
                Declividade média da gleba/talhão(%):
              </label>
              <input
                type="number"
                name="declividadeMedia"
                min={0}
                max={100}
                className="form-control"
                placeholder="EX: 12"
                value={formData.declividadeMedia}
                onChange={(e) => handleChange(e, "formData.declividadeMedia")}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">
                Plantio em contorno (1-Sim, 0-Não):
              </label>
              <input
                type="number"
                name="plantioContorno"
                min={0}
                max={1}
                className="form-control"
                placeholder="EX: 1"
                value={formData.plantioContorno}
                onChange={(e) => handleChange(e, "formData.plantioContorno")}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">
                Terraceamento (1-Sim, 0-Não):
              </label>
              <input
                type="number"
                name="terraceamento"
                min={0}
                max={1}
                className="form-control"
                placeholder="EX: 0"
                value={formData.terraceamento}
                onChange={(e) => handleChange(e, "formData.terraceamento")}
              />
            </div>
          </div>
        </div>

        {/* Índices */}
        <div className="card mb-4 border-0">
          <div className="card-header text-white" style={{ backgroundColor: "#2a7a22" }}>
            <h3>Índices</h3>
          </div>
          <div className="card-body">
            {formData.indices.map((indice, index) => (
              <div key={index} className="mb-3">
                <label className="form-label">Satélite*:</label>
                <input

                name="satelite"
                  type="text"
                  required
                  placeholder="EX: Sentinel"
                  className="form-control mb-2"
                  value={indice.satelite}
                  onChange={(e) => handleArrayChange(e, index, "indices", "satelite")}
                />
                <label className="form-label">Coordenada (WKT)*:</label>
                <input
                  type="text"
                  required
                  placeholder="EX: POINT(40.71727401 -74.00898606)"
                  className="form-control mb-2"
                  name="coordenada"
                  value={indice.coordenada}
                  onChange={(e) => handleArrayChange(e, index, "indices", "coordenada")}
                />
                <label className="form-label">NDVI*:</label>
                <input
                  type="text"
                  required
                  placeholder="EX: 0.3342"
                  className="form-control mb-2"
                  value={indice.ndvi}
                  name="ndvi"
                  onChange={(e) => handleArrayChange(e, index, "indices", "ndvi")}
                />
                <label className="form-label">NDTI*:</label>
                <input
                  type="text"
                  required
                  placeholder="EX: 0.1342"
                  className="form-control mb-2"
                  name="ndti"
                  value={indice.ndti}
                  onChange={(e) => handleArrayChange(e, index, "indices", "ndti")}
                />
              </div>
            ))}
            <button
              type="button"
              className="btn btn-primary"
              onClick={() =>
                addEntry("indices", { satelite: "", coordenada: "", data: "", ndvi: 0, ndti: 0 })
              }
            >
              Adicionar Índice
            </button>
          </div>
        </div>

        {/* Interpretações de Cultura */}
        <div className="card mb-4 border-0">
          <div className="card-header text-white" style={{ backgroundColor: "#2a7a22" }}>
            <h3>Interpretações de Cultura</h3>
          </div>
          <div className="card-body">
            {formData.interpretacoesCultura.map((cultura, index) => (
              <div key={index} className="mb-3">
                <label className="form-label">Cultura:</label>
                <input
                  type="text"
                  name="cultura"
                  placeholder="EX: Soja (grão)"
                  className="form-control mb-2"
                  value={cultura.cultura}
                  onChange={(e) => handleArrayChange(e, index, "interpretacoesCultura", "cultura")}
                />
                <label className="form-label">Data de Emergência:</label>
                <input
                  type="date"
                  name="dataInicio"
                  className="form-control mb-2"
                  value={cultura.dataInicio}
                  onChange={(e) => handleArrayChange(e, index, "interpretacoesCultura", "dataInicio")}
                />
                <label className="form-label">Data da Colheita:</label>
                <input
                  type="date"
                  className="form-control mb-2"
                  name="dataFim"
                  value={cultura.dataFim}
                  onChange={(e) => handleArrayChange(e, index, "interpretacoesCultura", "dataFim")}
                />
                <label className="form-label">
                  Cobertura do solo (%):
                </label>
                <input
                  type="number"
                  name="coberturaSolo"
                  min={0}
                  max={100}
                  className="form-control"
                  value={cultura.coberturaSolo}
                  placeholder="EX: 12"
                  onChange={(e) => handleChange(e, "planta.coberuraSolo")}
                />
              </div>
            ))}
            <button
              type="button"
              className="btn btn-primary"
              onClick={() =>
                addEntry("interpretacoesCultura", {
                  cultura: "",
                  dataInicio: "",
                  dataFim: "",
                  coberturaSolo: 0,
                })
              }
            >
              Adicionar Cultura
            </button>
          </div>
        </div>

        {/* Interpretações de Manejo */}
        <div className="card mb-4 border-0">
          <div className="card-header text-white" style={{ backgroundColor: "#2a7a22" }}>
            <h3>Interpretações de Manejo</h3>
          </div>
          <div className="card-body">
            {formData.interpretacoesManejo.map((manejo, index) => (
              <div key={index} className="mb-3">
                <label className="form-label">Data:</label>
                <input
                  type="date"
                  className="form-control mb-2"
                  value={manejo.data}
                  name="data"
                  onChange={(e) => handleArrayChange(e, index, "interpretacoesManejo", "data")}
                />
                <label className="form-label">Operação: </label>
                <input
                  type="text"
                  placeholder="EX: Revolvimento do solo"
                  className="form-control mb-2"
                  name="operacao"
                  value={manejo.operacao}
                  onChange={(e) => handleArrayChange(e, index, "interpretacoesManejo", "operacao")}
                />
                <label className="form-label">Tipo de Operação:</label>
                <input
                  type="text"
                  className="form-control mb-2"
                  placeholder="EX: Aração"
                  name="tipoOperacao"
                  value={manejo.tipoOperacao}
                  onChange={(e) =>
                    handleArrayChange(e, index, "interpretacoesManejo", "tipoOperacao")
                  }
                />
                
                
              </div>
            ))}
            <button
              type="button"
              className="btn btn-primary"
              onClick={() =>
                addEntry("interpretacoesManejo", {
                  data: "",
                  operacao: "",
                  tipoOperacao: "",
                })
              }
            >
              Adicionar Manejo
            </button>
          </div>
        </div>

        <div className="text-center">
          <button type="submit" className="btn btn-success">
            Enviar Dados
          </button>
        </div>
      </form>
    </div>
  );
};

export default Form3;