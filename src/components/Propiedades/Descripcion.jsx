import Header from '../Head';
import { Editor } from 'primereact/editor';

// Nota: Revisar documentacion en componente Caracteristicas para entender el funcionamiento de este componente.
const Description = ({ editor, setEditor }) => {
    return (
        <div className='px-2 ml-8 mt-20'>
            <Header category="" title="Descripcion" />
            <div className="card">

                <Editor style={{ height: '320px' }} value={editor} onTextChange={(e) => setEditor(e.htmlValue)} />

            </div>
        </div>
    );
}
export default Description;