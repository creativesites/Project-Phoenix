import { NextRequest, NextResponse } from 'next/server'
import puppeteer from 'puppeteer'

export async function GET(request: NextRequest) {
  try {
    // Launch browser with Vercel-friendly configuration
    const browser = await puppeteer.launch({
      headless: true,
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-accelerated-2d-canvas',
        '--no-first-run',
        '--no-zygote',
        '--single-process',
        '--disable-gpu'
      ],
      executablePath:
        process.env.NODE_ENV === 'production'
          ? process.env.PUPPETEER_EXECUTABLE_PATH
          : puppeteer.executablePath(),
    })
    
    const page = await browser.newPage()
    
    // Get the base URL
    const protocol = request.headers.get('x-forwarded-proto') || 'http'
    const host = request.headers.get('host') || 'localhost:3000'
    const baseUrl = `${protocol}://${host}`
    
    // Navigate to the whitepaper page
    await page.goto(`${baseUrl}/pdf-whitepaper`, {
      waitUntil: 'networkidle0',
      timeout: 30000
    })
    
    // Generate PDF
    const pdf = await page.pdf({
      format: 'A4',
      printBackground: true,
      margin: {
        top: '20mm',
        right: '20mm',
        bottom: '20mm',
        left: '20mm',
      },
      displayHeaderFooter: true,
      headerTemplate: `
        <div style="font-size: 10px; width: 100%; text-align: center; color: #666;">
          Tradvest - African Financial Literacy Platform
        </div>
      `,
      footerTemplate: `
        <div style="font-size: 10px; width: 100%; text-align: center; color: #666; margin: 10px;">
          <span class="pageNumber"></span> / <span class="totalPages"></span>
        </div>
      `,
    })
    
    await browser.close()
    
    // Track the download
    try {
      await fetch(`${baseUrl}/api/downloads`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ type: 'whitepaper' })
      })
    } catch (e) {
      console.error('Failed to track download:', e)
    }
    
    // Convert Uint8Array to Buffer for Response
    const pdfBuffer = Buffer.from(pdf)

    return new Response(pdfBuffer, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename="Tradvest-Whitepaper.pdf"',
      },
    })
  } catch (error) {
    console.error('Error generating PDF:', error)
    
    // Fallback: return HTML response that can be saved as PDF by browser
    const protocol = request.headers.get('x-forwarded-proto') || 'http'
    const host = request.headers.get('host') || 'localhost:3000'
    
    return NextResponse.redirect(`${protocol}://${host}/pdf-whitepaper`)
  }
}