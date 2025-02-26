let session = pl.create(1000);

const program = `
    % Hechos
    padre(alexander, sergio).
    padre(alexander, rodolfo).
    padre(alexander, yesica).
    madre(julia, sergio).
    madre(julia, rodolfo).
    madre(julia, yesica).

    padre(sergio, steven).
    padre(sergio, henry).
    padre(sergio, josue).
    madre(eugenia, josue).
    madre(eugenia, steven).
    madre(eugenia, henry).

    % Reglas
    abuelo(X, Y) :- padre(Z, X), padre(Y, Z).
    hermano(X, Y) :- padre(Z, X), madre(M, X), padre(Z, Y), madre(M, Y), X \\= Y.
    tios(X, Y) :- padre(Z, X), hermano(Z, Y).
`

session.consult(program, {
    success: () => { console.log('Programa cargado correctamente'); },
    error: (err) => { console.log('Error al cargar el programa' + err); }
});

function makeQuery() {
    const query = document.getElementById('queryInput').value;
    document.getElementById('output').innerText = '';
    console.log(query);
    session.query(query, {
        success: () => {
            session.answers(x => {
                if (x === false) {
                    document.getElementById("output").value += "No hay más soluciones.\n";
                    return;
                }
                document.getElementById("output").value += pl.format_answer(x) + "\n";
            });
        },
        fail: () => { document.getElementById('output').innerText += 'No hay respuesta\n'; },
        error: () => { document.getElementById('output').innerText += 'Error al realizar la consulta\n'; }
    });
}