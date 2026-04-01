import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getNails, deleteNails } from '../services/NailsAPI'
import '../App.css'

const nailImages = import.meta.glob('../assets/nails/*.png', { eager: true })

const SHAPE_LABELS  = { A: 'Almond', C: 'Coffin', S: 'Stiletto' }
const LENGTH_LABELS = { L: 'Long', M: 'Medium', S: 'Short' }
const COLOR_LABELS  = { P: 'Pink', B: 'Black', S: 'Sapphire', R: 'Red' }
const EFFECT_LABELS = { G: 'Glossy', M: 'Matte', S: 'Sparkly', A: 'Abstract' }

const ViewNails = () => {
    const navigate = useNavigate()
    const [nails, setNails] = useState([])

    useEffect(() => {
        getNails().then(setNails).catch(console.error)
    }, [])

    const handleDelete = async (id) => {
        await deleteNails(id)
        setNails(prev => prev.filter(n => n.id !== id))
    }

    return (
        <div className='view-page'>
            <h2>Custom Nail Sets</h2>
            {nails.length === 0 && (
                <p>No nail sets yet. <a href='/'>Create one!</a></p>
            )}
            <div className='nail-list'>
                {nails.map(nail => {
                    const imgSrc = nailImages[`../assets/nails/${nail.image}`]?.default
                    return (
                        <article key={nail.id}>
                            <header>
                                <h3>{nail.name}</h3>
                            </header>
                            <div className='nail-card-body'>
                                <div className='nail-info'>
                                    <p><strong>Shape:</strong> {SHAPE_LABELS[nail.shape] ?? nail.shape}</p>
                                    <p><strong>Length:</strong> {LENGTH_LABELS[nail.length] ?? nail.length}</p>
                                    <p><strong>Color:</strong> {COLOR_LABELS[nail.color] ?? nail.color}</p>
                                    <p><strong>Effect:</strong> {EFFECT_LABELS[nail.effect] ?? nail.effect}</p>
                                </div>
                                <div className='nail-image'>
                                    {imgSrc
                                        ? <img src={imgSrc} alt={nail.name} />
                                        : <p>No image available</p>
                                    }
                                </div>
                            </div>
                            <footer>
                                <button onClick={() => navigate(`/edit/${nail.id}`)}>Edit</button>
                                <button className='secondary' onClick={() => handleDelete(nail.id)}>Delete</button>
                            </footer>
                        </article>
                    )
                })}
            </div>
        </div>
    )
}

export default ViewNails
