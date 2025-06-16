import React from "react";
import { Card, CardContent } from "@/components/ui/card";

const daten = [
  {
    name: "Schwefelsäure",
    status: "Verfügbar",
    beschreibung: "Keine bedeutenden Lieferunterbrechungen erwartet",
    farbe: "green"
  },
  {
    name: "Natronlauge",
    status: "Möglicher Engpass",
    beschreibung: "Werkschließungen könnten in den nächsten drei Monaten zu Engpässen führen",
    farbe: "orange"
  },
  {
    name: "Aluminium",
    status: "Lieferprobleme",
    beschreibung: "Sanktionen und Beschränkungen könnten Versorgung und Preis beeinflussen",
    farbe: "red"
  }
];

const Dashboard = () => {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">Versorgungsrisiko-Prognose</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {daten.map((item) => (
          <Card key={item.name} className="border rounded-2xl shadow-md">
            <CardContent className="p-4">
              <h2 className={`text-xl font-semibold text-${item.farbe}-600`}>{item.name}</h2>
              <p className={`text-${item.farbe}-500 font-medium`}>{item.status}</p>
              <p className="text-sm text-gray-600 mt-2">{item.beschreibung}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-8">
        <h2 className="text-lg font-bold text-gray-700">Aluminium-Marktübersicht</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
          <Card><CardContent className="p-4">Aluminiumpreis: <strong>2.300 €/t ↑</strong></CardContent></Card>
          <Card><CardContent className="p-4">Nachfrage in Deutschland: <strong>Steigend</strong></CardContent></Card>
          <Card><CardContent className="p-4">Lieferung & Sanktionen: <strong className="text-red-500">Mögliche Störungen</strong></CardContent></Card>
        </div>
      </div>

      <div className="mt-6">
        <h2 className="text-md font-semibold text-gray-700">Aktuelle Entwicklungen</h2>
        <ul className="list-disc list-inside text-sm text-gray-600 mt-2">
          <li>Zoll auf Natronlauge-Exporte verhängt</li>
          <li>Sanktionen gegen großen Aluminiumproduzenten</li>
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
