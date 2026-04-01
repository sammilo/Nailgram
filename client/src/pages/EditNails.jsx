import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getNailsById, editNails } from '../services/NailsAPI'
import '../App.css'

const nailImages = import.meta.glob('../assets/nails/*.png', { eager: true })

const LENGTH_OPTIONS = {
    A: [{ value: 'M', label: 'Medium' }, { value: 'S', label: 'Short' }],
    C: [{ value: 'L', label: 'Long' },   { value: 'M', label: 'Medium' }],
    S: [{ value: 'L', label: 'Long' },   { value: 'M', label: 'Medium' }],
}

const EditNails = () => {
    const { id } = useParams()
    const navigate = useNavigate()

    const [name,   setName]   = useState('')
    const [shape,  setShape]  = useState('A')
    const [length, setLength] = useState('M')
    const [color,  setColor]  = useState('P')
    const [effect, setEffect] = useState('G')
    const [price,  setPrice]  = useState('')
    const [error,  setError]  = useState(null)
    const [loaded, setLoaded] = useState(false)

    useEffect(() => {
        getNailsById(id).then(nail => {
            setName(nail.name)
            setShape(nail.shape)
            setLength(nail.length)
            setColor(nail.color)
            setEffect(nail.effect)
            setPrice(nail.price)
            setLoaded(true)
        }).catch(console.error)
    }, [id])

    const handleShapeChange = (e) => {
        const newShape = e.target.value
        setShape(newShape)
        const validLengths = LENGTH_OPTIONS[newShape].map(o => o.value)
        if (!validLengths.includes(length)) {
            setLength(validLengths[0])
        }
    }

    const imageKey = `../assets/nails/${shape}${length}${color}${effect}.png`
    const previewSrc = nailImages[imageKey]?.default

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError(null)
        const image = `${shape}${length}${color}${effect}.png`
        try {
            await editNails(id, { name, shape, length, color, effect, price, image })
            navigate('/customnails')
        } catch (err) {
            setError(err.message)
        }
    }

    if (!loaded) return <p style={{ padding: '2rem' }}>Loading...</p>

    return (
        <div className='create-page'>
            <h2>Edit Nail Set</h2>
            <div className='create-layout'>
                <form onSubmit={handleSubmit}>
                    <label>
                        Nail Set Name
                        <input
                            type='text'
                            value={name}
                            onChange={e => setName(e.target.value)}
                            required
                        />
                    </label>

                    <label>
                        Shape
                        <select value={shape} onChange={handleShapeChange}>
                            <option value='A'>Almond</option>
                            <option value='C'>Coffin</option>
                            <option value='S'>Stiletto</option>
                        </select>
                    </label>

                    <label>
                        Length
                        <select value={length} onChange={e => setLength(e.target.value)}>
                            {LENGTH_OPTIONS[shape].map(opt => (
                                <option key={opt.value} value={opt.value}>{opt.label}</option>
                            ))}
                        </select>
                    </label>

                    <label>
                        Color
                        <select value={color} onChange={e => setColor(e.target.value)}>
                            <option value='P'>Pink</option>
                            <option value='B'>Black</option>
                            <option value='S'>Sapphire</option>
                            <option value='R'>Red</option>
                        </select>
                    </label>

                    <label>
                        Effect
                        <select value={effect} onChange={e => setEffect(e.target.value)}>
                            <option value='G'>Glossy</option>
                            <option value='M'>Matte</option>
                            <option value='S'>Sparkly</option>
                            <option value='A'>Abstract</option>
                        </select>
                    </label>

                    <label>
                        Price
                        <input
                            type='text'
                            value={price}
                            onChange={e => setPrice(e.target.value)}
                            placeholder='$00'
                            required
                        />
                    </label>

                    {error && <p style={{ color: 'red' }}>{error}</p>}

                    <button type='submit'>Save Changes</button>
                    <button type='button' className='secondary' onClick={() => navigate('/customnails')}>Cancel</button>
                </form>

                <div className='preview'>
                    <h3>Preview</h3>
                    {previewSrc
                        ? <img src={previewSrc} alt='Nail preview' />
                        : <p>No preview available</p>
                    }
                </div>
            </div>
        </div>
    )
}

export default EditNails
