import { render, screen, fireEvent } from '@testing-library/react'
import TicketCounter from './TicketCounter'

describe('TicketCounter Component', () => {
  it('debe incrementar y decrementar la cantidad correctamente', () => {
    const onInc = jasmine.createSpy('onIncrementar')
    const onDec = jasmine.createSpy('onDecrementar')

    render(
      <TicketCounter cantidad={2} onIncrementar={onInc} onDecrementar={onDec} />
    )

    fireEvent.click(screen.getByText('+'))
    expect(onInc).toHaveBeenCalled()

    fireEvent.click(screen.getByText('-'))
    expect(onDec).toHaveBeenCalled()
  })
})