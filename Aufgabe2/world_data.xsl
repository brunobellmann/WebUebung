<?xml version="1.0"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="2.0">
<xsl:output method="html" encoding="utf-8" doctype-public="-//W3C//DTD HTML 4.01 Transitional//DE"/>

    <xsl:template match="/">
        <html>
            <body>
                <table>
                    <th></th>
                    <xsl:for-each select="Countries/Country">
                        <tr>
                            <td><xsl:value-of select="id"/></td>
                            <td><xsl:value-of select="name"/></td>
                            <td><xsl:value-of select="birth"/></td>
                            <td><xsl:value-of select="cell"/></td>
                            <td><xsl:value-of select="children"/></td>
                            <td><xsl:value-of select="electricity"/></td>
                            <td><xsl:value-of select="internet"/></td>
                        </tr>
                    </xsl:for-each>
                </table>
            </body>
        </html>
    </xsl:template>
</xsl:stylesheet>