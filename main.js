const api_incidentes = "http://localhost:3000/api/incidentes";
const api_headers = {
    "Content-type": "application/json"
}

function actualizarIncidentes()
{
    let tabla = document.getElementById("tablaincidentes");

    //Resetear todos los datos
    tabla.innerHTML = "";

    //Llamar a la API
    let pedido = fetch(api_incidentes, { headers: api_headers }).then(response => response.json())

    //Mostrar si hubo un error
    pedido.catch(e => {
        console.error(e);
        tabla.innerHTML = `<p>Hubo un error al cargar los datos.</p>`;
    });

    //Mostrar los datos recibidos
    pedido.then(json => {
        console.log(json);

        tabla.innerHTML = `
            <thead>
                <tr>
                    <th>N.º</th>
                    <th>Ubicación</th>
                    <th>Asunto</th>
                    <th>Fecha y hora</th>
                    <th>Estado</th>
                </tr>
            </thead>
            <tbody>
            </tbody>
        `;

        //Iterar por cada incidente registrado
        for (let incidente of json) {
            console.log(incidente);

            let estado;
            switch (incidente.resuelto)
            {
                case 0:
                    estado = '<span class="badge rounded-pill text-bg-danger">No resuelto</span>';
                    break;
                case 1:
                    estado = `<span class="badge rounded-pill text-bg-success">Resuelto</span>`;
                    break;
            }

            tabla.tBodies[0].innerHTML += `
                <td>${incidente.id}</td>
                <td>${incidente.ubicacion}</td>
                <td>${incidente.asunto}</td>
                <td>${incidente.fecha}</td>
                <td>${estado}</td>
            `
        }
    });
}